import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  logout,
  login,
  loginFailure,
  getUserName,
} from './auth.actions';
import { initialState } from './auth.state';

export const authReducer = createReducer(
  initialState,
  on(login, (state, { userName, password }) => ({
    ...state,
    userName,
    password,
    isAuthorized: false,
  })),
  on(loginSuccess, (state, { token, userName }) => ({
    ...state,
    token, // Salva il token separatamente
    userName,
    isAuthorized: true,
    loginError: false,
  })),
  on(loginFailure, (state) => ({
    ...state, // Ripristina lo stato iniziale
    token: null,
    isAuthorized: false,
    loginError: true,
  })),
  on(getUserName, (state, { userName }) => ({
    ...state, // Ripristina lo stato iniziale
    userName,
  })),
  on(logout, () => {
    localStorage.removeItem('jwt'); // ✅ Rimuoviamo il token
    localStorage.removeItem('userName'); // ✅ Rimuoviamo il nome utente
    localStorage.removeItem('admin');
    return {
      userName: null,
      token: null,
      isAuthorized: false,
      loginError: false,
    };
  })
);
