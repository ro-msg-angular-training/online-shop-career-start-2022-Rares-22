import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/product/post';

//Add product

export const addProduct = createAction(
  ' Add product',
  props<{ product: Post }>()
);

export const addProductSuccess = createAction(
  '[API] Add Product Success',
  props<{ product: Post }>()
);

export const addProductError = createAction('[API] Add Product Error');

//Get by id

export const getProduct = createAction(
  'Get Product',
  props<{ productId: number }>()
);

export const getProductSuccess = createAction(
  '[API] Get Product Success',
  props<{ product: Post }>()
);

export const getProductError = createAction('[API] Get Product Error');

//Get products

export const getProducts = createAction('[Product List] Get Products');

export const getProductsSuccess = createAction(
  '[API] Get Products Success',
  props<{ products: Post[] }>()
);

export const getProductsError = createAction('[API] Get Products Error');

//Update

export const updateProduct = createAction(
  'Update Product',
  props<{ product: Post; id: number }>()
);

export const updateProductSuccess = createAction(
  '[API] Update Product Success',
  props<{ product: Post }>()
);

export const updateProductError = createAction('[API] Update Product Error');

//Delete

export const deleteProduct = createAction(
  '[Product List] Delete Product',
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  '[API] Delete Products Success',
);

export const deleteProductError = createAction('[API] Delete Products Error');

