import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private store: StoreService){}

  backgroundcanvas!: HTMLCanvasElement;

  body = document.body;
  html = document.documentElement;

  width = window.innerWidth;
  height = Math.max( this.body.scrollHeight, this.body.offsetHeight,
    this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight );

  title = 'AstroBackAngular';

  ngOnInit(): void {
    this.store.getAllObjects();
    this.store.getAllObservations();
    this.store.getAllUsers();
  }
}
