import { createReducer, on } from '@ngrx/store';
import { getUser, updateUser, isUserAdmin } from './user.actions';
import { initialUserState } from './user.state';

export const UserReducer = createReducer(
  initialUserState,
  on(isUserAdmin, (state, { isAdmin }) => ({
    ...state,
    isAdmin,
  })),
  on(updateUser, (state, { user }) => {
    console.log('reducer updateUSer chiamato con:', user);
    return {
      ...state, // Ripristina lo stato iniziale
      user,
    };
  }),
  on(getUser, (state, { userName }) => ({
    ...state,
    userName,
  }))
);
