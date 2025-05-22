import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { updateUser, isUserAdmin } from './user.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { loginSuccess } from '../Auth/auth.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      mergeMap(({ userName }) => {
        console.log('🔍 Ricevuto getUser con:', userName);
        return this.http
          .get<any>(
            `https://localhost:7167/api/PersonalPage/GetSingle?userName=${userName}`
          )
          .pipe(
            tap((userData) =>
              console.log('✅ Dati utente ricevuti:', userData)
            ), // 👀
            mergeMap((userData) => {
              const isAdmin =
                userData.roles?.some((role: any) => role.roleId === 2) || false;

              return [updateUser({ user: userData }), isUserAdmin({ isAdmin })];
            }),
            catchError(() => of(updateUser({ user: null })))
          );
      })
    )
  );
}
