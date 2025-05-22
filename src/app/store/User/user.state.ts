//autorizzazione e login
export interface UserState {
  isAdmin: boolean;
  user: any;
}

export const initialUserState: UserState = {
  isAdmin: !!localStorage.getItem('admin'),
  user: null,
};
