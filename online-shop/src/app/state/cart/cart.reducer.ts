import { createReducer, on } from "@ngrx/store";
import * as CartActions from './cart.actions';
import { Status } from '../data';

export interface CartState {
    error: string | null;
    status: Status;
  };
  
  export const initialCartState: CartState = {
    error: '',
    status: 'initial'
  };

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.checkout, (state) => ({
      ...state,
      status: 'loading',
    }
  )),
  on(CartActions.checkoutSuccess, (state) => ({
    ...state,
    products: [],
    error: null,
    status: 'ready',
  })),

)
