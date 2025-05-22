import { Injectable } from '@angular/core';
import { GetServicesService } from './get-services.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(public serv: GetServicesService) {}

  user: any = [];
  objects: any = [];
  events: any;
  observations: any;
  users: any;
  dataSourceObservations: any;
  isAdmin = false;

  //observable per il getUser
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  //observable per il getUserObservations
  private userObservations = new BehaviorSubject<any>(null);
  userObservations$ = this.userObservations.asObservable();

  getAllObjects() {
    this.serv
      .GetAll('https://localhost:7167/api/CelestialObject/GetList/')
      .subscribe((data) => {
        this.objects = data;
        // console.log(this.objects);
      });
  }

  getAllObservations() {
    this.serv
      .GetAll('https://localhost:7167/api/PersonalPage/GetObservationsList/')
      .subscribe((data) => {
        this.observations = data;
        // console.log(this.observations);
      });
  }

  getAllUsers() {
    this.serv
      .GetAllUsers('https://localhost:7167/api/Home/GetList/')
      .subscribe((data) => {
        this.users = data;
        // console.log(this.users);
      });
  }

  getUser(userName: string): Observable<any> {
    return new Observable((observer) => {
      this.serv
        .GetUser(
          'https://localhost:7167/api/PersonalPage/GetSingle?userName=',
          userName
        )
        .subscribe(
          (data) => {
            this.userSubject.next(data);
            observer.next(data);
            observer.complete();
            if (this.user.roles) {
              if (this.user && this.user.roles[0].roleId == 2) {
                this.isAdmin = true;
                localStorage.setItem('admin', 'admin');
              }
            }
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }

  getUserObservations(userId: string): Observable<any> {
    return new Observable((observer) => {
      this.serv
        .GetUserObservations(
          'https://localhost:7167/api/PersonalPage/GetObservationsById?id=',
          userId
        )
        .subscribe(
          (data: any) => {
            this.userObservations.next(data);
            observer.next(data);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }
}
