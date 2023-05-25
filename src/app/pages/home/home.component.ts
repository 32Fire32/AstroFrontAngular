import { Component, OnInit, AfterContentChecked, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {

slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

username: any
notLoggedIn = "Utente Sconosciuto"

  constructor(){}

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
  }

  ngAfterContentChecked(): void {
    this.username = localStorage.getItem("username")
  }
}
