import { Cart, CartItem } from '@shared/interfaces/cart-interface/cart-interface';

export interface CartState {
  cart: Cart | null;
  quantity: CartItem[];
  totalPrice: number; 
}

export const initialState: CartState = {
  cart: null,
  quantity: [],
  totalPrice: 0
};
