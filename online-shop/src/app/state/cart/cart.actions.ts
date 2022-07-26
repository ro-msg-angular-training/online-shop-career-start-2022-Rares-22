import { createAction, props } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';


export const checkout = createAction(
  'Checkout'
);

export const checkoutSuccess = createAction('[Checkout] Checkout Success');

export const checkoutFailure = createAction(
  'Checkout Failure'
);

