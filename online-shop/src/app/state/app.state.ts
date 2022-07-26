import { ProductState } from './products/product.reducer';
import { UserState } from './login/login.reducer';
import { CartState } from './cart/cart.reducer';


export interface AppState {
  products: ProductState;
  login: UserState;
  cart: CartState;
}
