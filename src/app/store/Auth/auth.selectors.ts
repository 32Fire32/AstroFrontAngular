import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectAuthState = (state: AppState) => state.auth;

export const getUserName = createSelector(selectAuthState, (authState) =>
  authState ? authState.userName : null
);

export const getToken = createSelector(
  selectAuthState,
  (authState) => authState.token
);

export const isAuthorized = createSelector(
  selectAuthState,
  (authState) => authState.isAuthorized
);

export const loginError = createSelector(
  selectAuthState,
  (authState) => authState.loginError
);
