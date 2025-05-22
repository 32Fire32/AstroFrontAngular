import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectUserState = (state: AppState) => state.user;

export const isAdmin = createSelector(
  selectUserState,
  (userState) => userState.isAdmin
);

export const getUser = createSelector(
  selectUserState,
  (state) => state.user
);
