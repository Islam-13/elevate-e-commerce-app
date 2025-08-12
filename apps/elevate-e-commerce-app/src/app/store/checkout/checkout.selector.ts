import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.reducers';

export const selectCheckoutSatet =
  createFeatureSelector<CheckoutState>('checkout');

export const selectAddress = createSelector(
  selectCheckoutSatet,
  (state) => state.addresses
);
