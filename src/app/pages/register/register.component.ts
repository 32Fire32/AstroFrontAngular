import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { RegisterServiceService } from 'src/app/services/register-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

token = ""
constructor(private registerService: RegisterServiceService, private http: HttpClient, private router: Router){}

registerForm: NgForm | undefined

onRegister(form: {UserName: string, FirstName: string, LastName: string, Email: string, Password: string, Image: string }){
  this.http.post('https://localhost:7167/api/Login/register',form, {responseType: "text"})
  .subscribe(
    data => {
    console.log(data)
      this.token = data.toString();
      localStorage.setItem("jwt", this.token);
      this.router.navigate(["/"]);
  })


}


  // onSubmit(form: NgForm){
  //   this.registerService.registerUser('https://localhost:7167/api/login/register',{
  //     UserName: form.value.UserName,
  //     FirstName: form.value.FirstName,
  //     LastName: form.value.LastName,
  //     Email: form.value.Email,
  //     Password: form.value.Password,
  //     Image: form.value.Image,
  //     Subscribed: form.value.Subscribed,
  //   }).subscribe(data =>{
  //     console.log(data)
  //   })
  // }
  // onSubmit(form: NgForm): Observable<NgForm> {
  //   return this.http.post<NgForm>(this.registerUrl, form).pipe(
  //     catchError(this.handleError('onSubmit', form))
  //   ).subscribe(data => {
  //     console.log(data)
  //   })
  // }
}
