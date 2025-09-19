import { createAction, props } from '@ngrx/store';
import { Cart, CartItem } from '@shared/interfaces/cart-interface/cart-interface';

export const getTotal = createAction('[Cart] Get Total', props<{ cartData: Cart }>());
export const updateCount = createAction('[Cart] Update Count', props<{ qun: CartItem[] }>());
export const ApplyData = createAction('[Cart] Apply Data');

export const changeItemQuantity = createAction(
  '[Cart] Change Item Quantity',
  props<{ id: string; count: number }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ id: string }>()
);

export const ClearCart = createAction('[Cart] Clear Cart');
