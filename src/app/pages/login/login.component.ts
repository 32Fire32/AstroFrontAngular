import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;

  credentials: LoginModel = {username:'', password:''};

  user: any = [];

  username: any;

  isAdmin: any;

  admin: any

  constructor(private router: Router, private http: HttpClient, private serv: GetServicesService, private store: StoreService) { }
  ngOnInit(): void {

  }
  login = ( form: NgForm) => {
    if (form.valid) {
      this.http.post("https://localhost:7167/api/Login/login", this.credentials, {
        headers: new HttpHeaders({ "Content-Type": "application/json"}),
        responseType: "text"
      })
      .subscribe(
        data => {
          const token = data
          localStorage.setItem("jwt", token);
          const username = this.credentials.username
          localStorage.setItem("username", username)
          this.invalidLogin = false;
          this.router.navigate(["/"]);
          this.username = localStorage.getItem("username")
          this.store.getUser(this.username, this.isAdmin, this.admin)
        },
        error => {
          this.invalidLogin = true
        }
      )
    }
  }
}
