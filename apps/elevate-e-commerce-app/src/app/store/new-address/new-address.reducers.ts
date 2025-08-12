import { createReducer, on } from '@ngrx/store';
import * as actions from './new-address.actions';
import { State } from '@shared/interfaces/addresses';

const initialState: State = {
  currentStep: 1,
  city: '',
  street: '',
  phone: '',
  lat: 0,
  long: 0,
  username: '',
};

export const newAddressReducers = createReducer(
  initialState,
  on(actions.getAddresses, (state, value) => ({ ...state, ...value })),

  on(actions.getLocation, (state, value) => ({ ...state, ...value })),

  on(actions.nextStep, (state) => ({ ...state, currentStep: 2 })),

  on(actions.prevStep, (state) => ({ ...state, currentStep: 1 })),

  on(actions.reset, () => ({ ...initialState }))
);
