import { AuthState } from "./store/Auth/auth.state";
import { ObservationsState } from "./store/Observations/obs.state";
import { UserState } from "./store/User/user.state";

export interface AppState {
  auth: AuthState;
  obs: ObservationsState;
  user: UserState;
}