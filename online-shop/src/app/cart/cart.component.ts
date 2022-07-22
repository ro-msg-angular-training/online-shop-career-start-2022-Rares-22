import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../product/post';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart = new Array<Post>();

  constructor(
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void {
    this.cartService.checkout().subscribe();
  }
}

