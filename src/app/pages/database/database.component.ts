import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';
import { UpdateService } from '../../services/update.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
  preferences = [];
  objectId: number = 0;
  userName: any;
  user: any = [];
  objects: any = [];
  object: any = [];
  id: any;
  liked = false;
  router: any;

  constructor(
    private route: ActivatedRoute,
    private serv: GetServicesService,
    private store: StoreService,
    private updateService: UpdateService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit() {
    //on init
    this.liked = false;
    this.userName = localStorage.getItem('userName');
    this.serv
      .GetUser(
        'https://localhost:7167/api/PersonalPage/GetSingle?userName=',
        this.userName
      )
      .subscribe((data) => {
        this.user = data;
        console.log('user');

        this.id = this.route.snapshot.paramMap.get('id');
        this.serv
          .GetSingle(
            'https://localhost:7167/api/CelestialObject/GetSingle?id=',
            this.id
          )
          .subscribe((data) => {
            this.object = data;

            if (this.user) {
              this.user.celestialObjectsPreferences.forEach((element: any) => {
                console.log('sono entrato');
                console.log(element.celestialObjectId);
                console.log(this.object.celestialObjectId);
                if (element.celestialObjectId == this.id) {
                  this.liked = true;
                  console.log('true');
                }
              });
            }
          });

        this.serv
          .GetAll('https://localhost:7167/api/CelestialObject/GetList/')
          .subscribe((data) => {
            this.objects = data;
          });
      });

    //on change
    this.updateService.buttonClicked$.subscribe(() => {
      console.log('Button clicked');

      this.liked = false;
      this.userName = localStorage.getItem('userName');
      this.serv
        .GetUser(
          'https://localhost:7167/api/PersonalPage/GetSingle?userName=',
          this.userName
        )
        .subscribe((data) => {
          this.user = data;
          console.log('user');

          this.id = this.route.snapshot.paramMap.get('id');
          this.serv
            .GetSingle(
              'https://localhost:7167/api/CelestialObject/GetSingle?id=',
              this.id
            )
            .subscribe((data) => {
              this.object = data;

              this.user.celestialObjectsPreferences.forEach((element: any) => {
                console.log('sono entrato');
                console.log(element.celestialObjectId);
                console.log(this.object.celestialObjectId);
                if (element.celestialObjectId == this.id) {
                  this.liked = true;
                  console.log('true');
                }
              });
            });

          this.serv
            .GetAll('https://localhost:7167/api/CelestialObject/GetList/')
            .subscribe((data) => {
              this.objects = data;
            });
        });
    });
  }

  EditPreferences() {
    this.liked = !this.liked;
    this.serv
      .EditPref('https://localhost:7167/api/PersonalPage/GetPreferences', {
        UserId: this.user.userId,
        CelestialObjectId: this.id,
        CelestialObject: {
          CelestialObjectId: this.id,
          Name: this.object.name,
          Description: this.object.description,
          ObjectImgUrl: this.object.objectImgUrl,
        },
      })
      .subscribe((data: any) => {
        console.log(data);
      });
  }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  };
}
