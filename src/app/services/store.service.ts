import { Injectable } from '@angular/core';
import { GetServicesService } from './get-services.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private serv: GetServicesService) { }

  user: any = [];
  objects: any = [];
  events: any
  observations: any


  getAllObjects(){
    this.serv.GetAll("https://localhost:7167/api/CelestialObject/GetList/").subscribe((data) =>{
      this.objects = data;
      console.log(this.objects)
    })
  }

  getAllObservations(){
    this.serv.GetAll("https://localhost:7167/api/PersonalPage/GetObservationsList/").subscribe((data) =>{
      this.objects = data;
      console.log(this.objects)
    })
  }

  getUser(username: string, isAdmin: any, admin: any){
    this.serv.GetUser("https://localhost:7167/api/PersonalPage/GetSingle?username=", username)
          .subscribe((data) =>{
              this.user = data;
              console.log(this.user)
              if(this.user && this.user.roles[0].roleId == 2){
                isAdmin = true;
                localStorage.setItem("admin", admin)
              }
            },
    )
  }

  }
