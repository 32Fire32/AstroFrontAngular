import { createAction, props } from '@ngrx/store';

//gestione dello user
export const getUser = createAction(
  '[User] Get User',
  props<{ userName: string }>() // 👈 Questo è essenziale!
);

export const isUserAdmin = createAction(
  '[User] Is Admin',
  props<{
    isAdmin: boolean;
  }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: any }>()
);
