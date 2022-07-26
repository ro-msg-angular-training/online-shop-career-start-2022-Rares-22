
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { AppState } from '../app.state';
import { CartService } from 'src/app/cart.service';

@Injectable()
export class CartEffects {
  constructor(
    private store: Store<AppState>, 
    private actions$: Actions,
    private cartService: CartService
  ) {}

  checkout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CartActions.checkout),
    switchMap(() => this.cartService.checkout()
      .pipe(
        map(() => CartActions.checkoutSuccess()),
        catchError(() => of(CartActions.checkoutFailure()))
      )
    ),
  ),
);

}