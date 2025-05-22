import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from 'src/app/_interfaces/login.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { login } from 'src/app/store/Auth/auth.actions';
import {
  getUserName,
  getToken,
  isAuthorized,
  loginError,
} from 'src/app/store/Auth/auth.selectors';
import { Observable } from 'rxjs';
import { GetServicesService } from 'src/app/services/get-services.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: LoginModel = { userName: '', password: '' };
  isAuthorized$: Observable<boolean | false>;
  loginError$: Observable<boolean | false>;
  userName$: Observable<string | null>;
  isAdmin: any;
  admin: any;
  constructor(private store: Store<AppState>) {
    this.isAuthorized$ = this.store.pipe(select(isAuthorized));
    this.loginError$ = this.store.pipe(select(loginError));
    this.userName$ = this.store.pipe(select(getUserName));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login(form: NgForm): void {
    if (form.valid) {
      console.log('Dispatching login:', this.credentials); // ✅ DEBUG
      if (this.store) {
        this.store.dispatch(
          login({
            userName: this.credentials.userName,
            password: this.credentials.password,
          })
        );
      }
    }
  }
}
