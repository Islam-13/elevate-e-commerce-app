import { createReducer, on } from '@ngrx/store';
import * as actions from './address.actions';
import { State } from '@shared/interfaces/addresses';

const initialState: State = {
  addresses: [],
  currentStep: 1,
  city: '',
  street: '',
  phone: '',
  lat: 0,
  long: 0,
  username: '',
  editSession: false,
  editAddressId: '',
};

export const newAddressReducers = createReducer(
  initialState,

  on(actions.getAddresses, (state, { value }) => ({
    ...state,
    addresses: value,
  })),

  on(actions.addAddress, (state, value) => ({ ...state, ...value })),

  on(actions.editAddress, (state, value) => ({
    ...state,
    city: value.city,
    street: value.street,
    phone: value.phone,
    lat: Number(value.lat),
    long: Number(value.long),
    editSession: true,
    editAddressId: value._id,
    currentStep: 1,
  })),

  on(actions.getLocation, (state, value) => ({ ...state, ...value })),

  on(actions.nextStep, (state) => ({ ...state, currentStep: 2 })),

  on(actions.prevStep, (state) => ({ ...state, currentStep: 1 })),

  on(actions.reset, () => ({ ...initialState }))
);
