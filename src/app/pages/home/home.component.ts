import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { GetServicesService } from 'src/app/services/get-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

username: any
notLoggedIn = "Utente Sconosciuto"
events: any
pathUrl = "https://localhost:7167"

  constructor(private serv: GetServicesService){}

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.serv.GetAllEvents("https://localhost:7167/api/Admin/GetListEvents").subscribe((data: any) => {
      console.log(data)
      this.events = data
    })
  }

  ngAfterContentChecked(): void {
    this.username = localStorage.getItem("username")
  }
}
