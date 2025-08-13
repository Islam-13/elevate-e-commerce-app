import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('total');

export const selectCart = createSelector(
  selectCartState,
  (state) => state.cart
);

export const selectQuantity = createSelector(
  selectCartState,
  (state) => state.quantity
);

export const selectTotalPrice = createSelector(
  selectCartState,
  (state: CartState) => state.totalPrice
);

export const selectNumOfCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.cart?.numOfCartItems || 0
);
