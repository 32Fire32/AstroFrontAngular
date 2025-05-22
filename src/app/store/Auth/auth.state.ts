//autorizzazione e login
export interface AuthState {
  userName: string | null;
  token: string | null;
  isAuthorized: boolean;
  loginError: boolean;
}

export const initialState: AuthState = {
  userName: localStorage.getItem('userName') || null,
  token: localStorage.getItem('jwt'),
  isAuthorized: !!localStorage.getItem('jwt'),
  loginError: false,
};
