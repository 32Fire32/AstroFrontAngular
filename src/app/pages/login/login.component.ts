import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/_interfaces/AutheniticatedResponse.model';
import { LoginModel } from 'src/app/_interfaces/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;

  credentials: LoginModel = {username:'', password:''};

  constructor(private router: Router, private http: HttpClient) { }
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
          console.log(data)
          const token = data
          localStorage.setItem("jwt", token);
          const username = this.credentials.username
          localStorage.setItem("username", username)
          this.invalidLogin = false;
          this.router.navigate(["/"]);
        },
        error => {
          this.invalidLogin = true
        }
      //   {
      //   next: (response: AuthenticatedResponse) => {
      //     const token = response.token;
      //     localStorage.setItem("jwt", token);
      //     this.invalidLogin = false;
      //     this.router.navigate(["/"]);
      //   },
      //   error: (err: HttpErrorResponse) => this.invalidLogin = true
      // }
      )
    }
  }
}
