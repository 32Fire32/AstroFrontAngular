import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess } from './auth.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { StoreService } from '../../services/store.service';
import { getUserName } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private str: StoreService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ userName, password }) => {
        console.log('Effetto ricevuto, chiamo API con:', userName, password);
        return this.http
          .post<any>('https://localhost:7167/api/Login/login', {
            userName,
            password,
          })
          .pipe(
            map((response) => {
              const token = response.token;
              localStorage.setItem('jwt', token);
              localStorage.setItem('userName', userName);

              return loginSuccess({
                token,
                userName: userName,
              });
            }),
            catchError(() => of(loginFailure()))
          );
      })
    )
  );

  //qui mi salvo il token per la sessione dell'utente loggato
  saveToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          localStorage.setItem('jwt', action.token);
          localStorage.setItem('userName', action.userName);
        })
      ),
    { dispatch: false }
  );

  // Dopo il login, recupera i dati utente
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(({ userName }) => console.log('🚀 Dispatch getUser per:', userName)),
      // If you want to dispatch an action to load user data, create and dispatch a proper action here.
      // For example, if you have a 'loadUser' action:
      map(({ userName }) => {
        const action = { type: '[Auth] Load User', userName };
        console.log('✅ Azione creata:', action);
        return action;
      })
    )
  );
}
