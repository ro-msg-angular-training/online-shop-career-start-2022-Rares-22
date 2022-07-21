import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  product: Post | null = null;
  idP: number = 0;
  shoppingCart = new Array<Post>();

  profileForm = this.fb.group({
    name: [''],
    category: [''],
    price: [''],
    description: [''],
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http
      .get(`http://localhost:3000/products/${id}`)
      .subscribe((data) => (this.product = data as Post | null));
  }

  deleteProduct(product: Post | null) {
    if (product)
      this.http
        .delete(`http://localhost:3000/products/${product.id}`)
        .subscribe();
  }

  addToCart(product: Post | null) {
    this.cartService.addToCart(product);
  }
}
