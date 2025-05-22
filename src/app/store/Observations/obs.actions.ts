import { createAction, props } from '@ngrx/store';

export const loadObservations = createAction(
  '[Observations] Load Observations',
  props<{ userId: string }>()
);

export const loadObservationsSuccess = createAction(
  '[Observations] Load Observations success',
  props<{ observations: any }>()
);

export const loadObservationsFailure = createAction(
  '[Observations] Load Observations failure'
);
