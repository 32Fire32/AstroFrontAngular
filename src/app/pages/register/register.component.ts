import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

token = ""
username: any;
constructor(private http: HttpClient, private router: Router){}

registerForm: NgForm | undefined

onRegister(form: {UserName: string, FirstName: string, LastName: string, Email: string, Password: string, Image: string }){
  console.log(form)
  this.http.post('https://localhost:7167/api/Login/register',form ,{responseType: "text"})
  .subscribe(
    data => {
    console.log(data)
      this.token = data.toString();
      localStorage.setItem("jwt", this.token);
      this.username = form.UserName;
      localStorage.setItem("username", this.username);
      this.router.navigate(["/"]);
  })
 }
}
