import { createReducer, on } from '@ngrx/store';
import { Addresses } from '@shared/interfaces/addresses';

import * as actions from './checkout.actions';

export interface CheckoutState {
  addresses: Addresses[];
  currentStep: number;
  selectedAddress: string;
  selectedMethod: string;
}

const initialState: CheckoutState = {
  addresses: [],
  currentStep: 1,
  selectedAddress: '',
  selectedMethod: '',
};

export const checkoutReducers = createReducer(
  initialState,
  on(actions.getAddresses, (state, { value }) => ({
    ...state,
    addresses: value,
  })),

  on(actions.selectAddress, (state, { value }) => ({
    ...state,
    selectedAddress: value,
  })),

  on(actions.selectMethod, (state, { value }) => ({
    ...state,
    selectedMethod: value,
  })),

  on(actions.nextStep, (state) => ({ ...state, currentStep: 2 })),

  on(actions.prevStep, (state) => ({ ...state, currentStep: 1 }))
);
