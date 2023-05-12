import { Component, OnInit, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

username: any
notLoggedIn = "Utente Sconosciuto"

  constructor(){}
  ngAfterContentChecked(): void {
    this.username = localStorage.getItem("username")
  }
  ngOnInit(): void {
    this.username = localStorage.getItem("username")
  }
}
