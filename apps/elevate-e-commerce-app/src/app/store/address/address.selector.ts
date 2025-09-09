import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@shared/interfaces/addresses';

export const selectNewAddressState = createFeatureSelector<State>('newAddress');

export const selectNewAddress = createSelector(
  selectNewAddressState,
  (state) => state
);

export const selectAddress = createSelector(
  selectNewAddressState,
  (state) => state.addresses
);
