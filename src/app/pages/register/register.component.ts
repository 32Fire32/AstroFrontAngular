import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  token = '';
  userName: any;
  constructor(private http: HttpClient, private router: Router) {}

  registerForm: NgForm | undefined;

  onRegister(form: {
    userName: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Image: string;
  }) {
    console.log(form);
    this.http
      .post('https://localhost:7167/api/Login/register', form, {
        responseType: 'text',
      })
      .subscribe((data) => {
        localStorage.clear();
        console.log(data);
        this.token = data.toString();
        localStorage.setItem('jwt', this.token);
        this.userName = form.userName;
        localStorage.setItem('userName', this.userName);
        this.router.navigate(['/']);
      });
  }
}
