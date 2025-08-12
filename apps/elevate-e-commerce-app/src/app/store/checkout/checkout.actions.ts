import { createAction, props } from '@ngrx/store';
import { Addresses } from '@shared/interfaces/addresses';

export const getAddresses = createAction(
  '[checkout] getAddresses',
  props<{ value: Addresses[] }>()
);

export const selectAddress = createAction(
  '[checkout] selectAddress',
  props<{ value: string }>()
);

export const selectMethod = createAction(
  '[checkout] selectMethod',
  props<{ value: string }>()
);

export const nextStep = createAction('[checkout] nextStep');

export const prevStep = createAction('[checkout] prevStep');
