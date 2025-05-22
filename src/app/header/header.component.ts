import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateService } from '../services/update.service';
import { Observable } from 'rxjs';
import {
  getToken,
  getUserName,
  isAuthorized,
} from '../store/Auth/auth.selectors';
import { logout } from '../store/Auth/auth.actions';
import { isAdmin } from '../store/User/user.selectors';
import { AppState } from '../app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  objects: any = [];
  searchObj: string = '';
  token$: Observable<string | null>;
  userName$: Observable<string | null>;
  isAuthorized$: Observable<boolean | false>;
  isAdmin$: Observable<boolean | false>;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private store: Store<AppState>,
    private updateService: UpdateService
  ) {
    this.token$ = this.store.select(getToken);
    this.userName$ = this.store.select(getUserName);
    this.isAuthorized$ = this.store.select(isAuthorized);
    this.isAdmin$ = this.store.select(isAdmin);
  }

  ngOnInit(): void {}

  clearInput() {
    this.searchObj = '';
  }

  logOut() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
  }

  onClick() {
    this.updateService.emitButtonClick();
    this.searchObj = '';
  }
}
