import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@shared/interfaces/addresses';

export const selectNewAddressState = createFeatureSelector<State>('newAddress');

export const selectNewAddress = createSelector(
  selectNewAddressState,
  (state) => state
);
