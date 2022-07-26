import { Component, OnInit, Injectable } from '@angular/core';
import { Post } from './post';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import * as ProductSelectors from '../state/products/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description'];
  products$ = this.store.select(ProductSelectors.selectProducts);

  productSubscription: Subscription | undefined;
  constructor(private productService: ProductService,
              private store: Store<AppState>) {}


  ngOnInit(): void  {
    this.store.dispatch(ProductActions.getProducts());
  }
  onLeave() {
    this.productSubscription?.unsubscribe();
  }
}
