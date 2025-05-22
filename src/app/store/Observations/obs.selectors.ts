import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

export const selectObservationsState = (state: AppState) => state.obs;

export const selectUserObservations = createSelector(
  selectObservationsState,
  (observationsState) => observationsState?.observations
);
