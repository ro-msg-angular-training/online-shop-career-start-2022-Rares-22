import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../product/post';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {

  addProductSuccessSubscription: Subscription = new Subscription();
  addProductErrorSubscription: Subscription = new Subscription();

  product: Post = {
    id: 0,
    name: '',
    category: '',
    image: '',
    price: 0,
    description: '',
  };

  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required, Validators.nullValidator]],
    price: [0, [Validators.required, Validators.nullValidator]],
    description: ['', [Validators.required, Validators.nullValidator]],
  });

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addProductSuccessSubscription = this.actions
    .pipe(ofType(ProductActions.addProductSuccess))
    .subscribe(({ product }) => {
      alert(`Added product with id=${this.product.id}!`);
      this.router.navigateByUrl('/products');
    });

  this.addProductErrorSubscription = this.actions
    .pipe(ofType(ProductActions.addProductError))
    .subscribe(() => alert('Failed to add product!'));
  }

  save() {
    this.product.name = this.profileForm.value.name || '';
    this.product.category = this.profileForm.value.category || '';
    this.product.price = this.profileForm.value.price || 0;
    this.product.description = this.profileForm.value.description || '';
    //this.productService.save(this.product).subscribe();

    this.store.dispatch(
      ProductActions.addProduct({
        product: this.product
      })
    );

  }
}
