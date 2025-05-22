import { createReducer, on } from '@ngrx/store';
import {
  loadObservations,
  loadObservationsSuccess,
  loadObservationsFailure,
} from './obs.actions';
import { initialObservationsState } from './obs.state';

export const observationsReducer = createReducer(
  initialObservationsState,
  on(loadObservations, (state, { userId }) => ({
    ...state,
    userId,
  })),
  on(loadObservationsSuccess, (state, { observations }) => ({
    ...state,
    observations,
  })),
  on(loadObservationsFailure, (state) => ({
    ...state,
    error: 'Errore durante il caricamento delle osservazioni',
  }))
);
