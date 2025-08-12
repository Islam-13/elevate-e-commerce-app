import { createAction, props } from '@ngrx/store';
import { Position } from '@shared/interfaces/addresses';

interface FirstStepAddress {
  city: string;
  street: string;
  phone: string;
}

export const getAddresses = createAction(
  '[newAddress] getAddresses',
  props<FirstStepAddress>()
);

export const getLocation = createAction(
  '[newAddress] getLocation',
  props<Position>()
);

export const nextStep = createAction('[newAddress] nextStep');

export const prevStep = createAction('[newAddress] prevStep');

export const reset = createAction('[newAddress] reset');
