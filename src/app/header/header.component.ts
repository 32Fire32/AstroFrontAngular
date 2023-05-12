import { Component, OnInit,DoCheck } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  user:any;

  admin: any;

  isAdmin: any;

  username : any;

  objects :any = [];

  searchObj : string = "";

  constructor(private router: Router, private jwtHelper: JwtHelperService, private store: StoreService, private updateService: UpdateService){}

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.store.getUser(this.username, this.isAdmin, this.admin)
  }

  ngDoCheck(): void {
    this.username = localStorage.getItem("username");
    this.objects = this.store.objects;
  }


  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
  if (token && !this.jwtHelper.isTokenExpired(token)){
    return true;
  }
  return false;
  }

  isAdminAuthenticated = (): boolean => {
    const admin = localStorage.getItem("admin");
  if (admin){
    return true;
  }
  return false;
  }

  clearInput(){
    this.searchObj = '';
  }

  logOut = () => {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  onClick() {
    this.updateService.emitButtonClick();
    this.searchObj = '';
  }
}
