import { createReducer, on } from '@ngrx/store';
import { Post } from 'src/app/product/post';
import { Status } from '../data';
import * as ProductActions from './product.actions';

export interface ProductState {
  status: Status;
  products: Post[];
  selectedProduct: Post | null;
}

const initialState: ProductState = {
  status: 'initial',
  products: [],
  selectedProduct: null,
};

export const productReducer = createReducer(
  initialState,
  // Add product
  on(ProductActions.addProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    status: 'loading',
    products: [...state.products, product],
  })),
  on(ProductActions.addProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Get product
  on(ProductActions.getProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ProductActions.getProductSuccess, (state, { product }) => ({
    ...state,
    status: 'ready',
    selectedProduct: product,
  })),
  on(ProductActions.getProductError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Get products
  on(ProductActions.getProducts, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ProductActions.getProductsSuccess, (state, { products }) => ({
    ...state,
    status: 'ready',
    products,
  })),
  on(ProductActions.getProductsError, (state) => ({
    ...state,
    status: 'error',
  })),

  // Update product
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    status: 'ready',
    products: state.products.map((oldProduct) => {
      return oldProduct.id === product.id ? product : oldProduct;
    }),
  })),
  on(ProductActions.updateProductError, (state) => ({
    ...state,
    status: 'error',
  }))
);
