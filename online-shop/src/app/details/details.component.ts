import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import * as ProductSelectors from '../state/products/product.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {

  //product$ = this.store.select(ProductSelectors.selectSelectedProduct);

  product: Post | null = null;
  idP: number = 0;
  shoppingCart = new Array<Post>();
  productSubscription: Subscription | undefined;

  

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
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router,
  ) {}

  canEdit: boolean | undefined;
  canAdd: boolean | undefined;
  id: number | undefined;

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);
    this.canAdd = this.authService.hasRole('customer');
    this.canEdit = this.authService.hasRole('admin');

     this.productSubscription = this.productService
       .getById(this.id)
       .subscribe((data) => (this.product = data as Post | null));
    //this.store.dispatch(ProductActions.getProduct({productId: this.id}))
  }

  deleteProduct(product: Post | null) {
    if (product) 
    this.store.dispatch(ProductActions.deleteProduct({productId: this.id as number}));

  }

  addToCart(product: Post | null) {
    this.cartService.addToCart(product);
  }

  onLeave() {
    this.productSubscription?.unsubscribe();
  }
}
