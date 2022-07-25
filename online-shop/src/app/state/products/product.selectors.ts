import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectProductState = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectProduct = createSelector(
  selectProductState,
  (state) => state.selectedProduct
);
