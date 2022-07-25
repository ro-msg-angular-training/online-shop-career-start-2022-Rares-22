import { ProductState } from './products/product.reducer';
import { UserState } from './login/login.reducer';

export interface AppState {
  products: ProductState;
  login: UserState;
}