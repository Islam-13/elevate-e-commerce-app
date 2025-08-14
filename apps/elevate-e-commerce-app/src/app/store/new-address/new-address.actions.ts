import { createAction, props } from '@ngrx/store';
import { Addresses, Position } from '@shared/interfaces/addresses';

interface FirstStepAddress {
  city: string;
  street: string;
  phone: string;
}

export const addAddress = createAction(
  '[newAddress] addAddress',
  props<FirstStepAddress>()
);

export const editAddress = createAction(
  '[newAddress] editAddress',
  props<Addresses>()
);

export const getLocation = createAction(
  '[newAddress] getLocation',
  props<Position>()
);

export const nextStep = createAction('[newAddress] nextStep');

export const prevStep = createAction('[newAddress] prevStep');

export const reset = createAction('[newAddress] reset');
