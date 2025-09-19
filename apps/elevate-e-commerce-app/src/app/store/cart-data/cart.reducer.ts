import { createReducer, on } from '@ngrx/store';
import { CartState, initialState } from './cart.state';
import {
  getTotal,
  updateCount,
  ApplyData,
  changeItemQuantity,
  removeItem,
  ClearCart
} from './cart.actions';

export const cartReducer = createReducer(
  initialState,

  // تحميل بيانات الكارت من API
  on(getTotal, (state, { cartData }) => ({
    ...state,
    cart: cartData,
    totalPrice: cartData.totalPrice
  })),

  // تحديث كل العناصر مع إعادة حساب الإجمالي
  on(updateCount, (state, { qun }) => ({
    ...state,
    quantity: qun,
    totalPrice: qun.reduce((total, item) => total + item.price * item.count, 0)
  })),

  // تعديل كمية منتج
  on(changeItemQuantity, (state, { id, count }) => {
    const updatedQuantity = state.quantity.map(item =>
      item.id === id ? { ...item, count } : item
    );

    const newTotalPrice = updatedQuantity.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    return {
      ...state,
      quantity: updatedQuantity,
      totalPrice: newTotalPrice
    };
  }),

  // حذف منتج
  on(removeItem, (state, { id }) => {
    const updatedQuantity = state.quantity.filter(item => item.id !== id);

    const newTotalPrice = updatedQuantity.reduce(
      (total, item) => total + item.price * item.count,
      0
    );

    return {
      ...state,
      quantity: updatedQuantity,
      totalPrice: newTotalPrice
    };
  }),

  // مسح الكارت
  on(ClearCart, () => ({
    cart: null,
    quantity: [],
    totalPrice: 0
  })),

  // إعادة حساب الإجمالي يدويًا (اختياري)
  on(ApplyData, (state) => ({
    ...state,
    totalPrice: state.quantity.reduce((total, item) => total + item.price * item.count, 0)
  }))
);
