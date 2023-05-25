import { Component, OnInit } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(private serv: GetServicesService, public store:StoreService){}

  users: any;
  observations: any =[];
  pathUrl = "https://localhost:7167"

  ngOnInit(): void {
      this.serv.GetAll("https://localhost:7167/api/PersonalPage/GetObservationsList/").subscribe((data) =>{
        this.observations = data;
        console.log('carousel',this.observations, data)
      })
      this.serv.GetAllUsers("https://localhost:7167/api/Home/GetList/").subscribe((data) =>{
      this.users = data;
      console.log('users in carousel',this.users)
    })
  }

}
