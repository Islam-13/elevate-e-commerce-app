import { createAction, props } from '@ngrx/store';

type PaymentMethod = 'cash' | 'credit';

export const selectAddress = createAction(
  '[checkout] selectAddress',
  props<{ value: string }>()
);

export const selectMethod = createAction(
  '[checkout] selectMethod',
  props<{ value: PaymentMethod }>()
);

export const nextStep = createAction('[checkout] nextStep');

export const prevStep = createAction('[checkout] prevStep');
