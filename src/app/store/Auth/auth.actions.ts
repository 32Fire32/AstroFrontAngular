import { createAction, props } from '@ngrx/store';

//autorizzazione
export const login = createAction(
  '[Auth] Login',
  props<{
    userName: string;
    password: string;
  }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; userName: string }>()
);
export const loginFailure = createAction('[Auth] Login Failure');

export const logout = createAction('[Auth] Logout');

export const getUserName = createAction(
  '[Auth] Get UserName',
  props<{ userName: string }>()
);
