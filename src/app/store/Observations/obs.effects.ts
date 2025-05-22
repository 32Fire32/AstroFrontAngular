import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadObservations,
  loadObservationsFailure,
  loadObservationsSuccess,
} from './obs.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';

@Injectable()
export class ObsEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadObservations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadObservations),
      switchMap(({ userId }) => {
        return this.http
          .get<any>(
            `https://localhost:7167/api/PersonalPage/GetObservationsById?id=${userId}`
          )
          .pipe(
            map((observations) => loadObservationsSuccess({ observations })),
            catchError(() => of(loadObservationsFailure()))
          );
      })
    )
  );
}
