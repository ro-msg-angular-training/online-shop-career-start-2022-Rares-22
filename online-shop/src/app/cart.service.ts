import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './product/post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpService: HttpClient) {}

  idP: number = 0;
  shoppingCart = new Array<Post>();

  addToCart(product: Post | null) {
    if (product) this.shoppingCart[this.idP] = product;
    this.idP += 1;
  }

  getCart() {
    return this.shoppingCart;
  }

  checkout() {
    return this.httpService.post(
      `${environment.url}/orders`,
      { customer: 'doej', products: this.shoppingCart },
      { responseType: 'text' }
    );
  }
}
