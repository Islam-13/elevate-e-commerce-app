import { createSelector } from '@ngrx/store';
import { selectToken } from './session.reducer';

export const selectIsLoggedIn = createSelector(selectToken, (t) => !!t);
