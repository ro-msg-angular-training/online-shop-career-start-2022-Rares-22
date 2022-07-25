import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { AppState } from '../state/app.state';
import * as ProductActions from '../state/products/product.actions';
import * as ProductSelectors from '../state/products/product.selectors';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  selectedProduct$ = this.store.select(ProductSelectors.selectProduct);
  selectedProductSubscription: Subscription = new Subscription();
  updateProductSuccessSubscription: Subscription = new Subscription();
  updateProductErrorSubscription: Subscription = new Subscription();

  product: Post = {
    id: 0,
    name: '',
    category: '',
    image: '',
    price: 0,
    description: '',
  };

  id: number | undefined;
  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required, Validators.nullValidator]],
    price: [0, [Validators.required, Validators.nullValidator]],
    description: ['', [Validators.required, Validators.nullValidator]],
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id') as string);

    this.productService.getById(this.id).subscribe((data) => {
      this.product = data;
      this.profileForm.patchValue(this.product);
    });

    this.updateProductSuccessSubscription = this.actions
      .pipe(ofType(ProductActions.updateProductSuccess))
      .subscribe(() => {
        alert('Product updated successfully!');
        this.router.navigateByUrl('/products');
      });

    this.updateProductErrorSubscription = this.actions
      .pipe(ofType(ProductActions.updateProductError))
      .subscribe(() => alert('Failed to update product!'));
    this.store.dispatch(ProductActions.getProduct({ productId: this.id }));
  }

  save() {
    this.product.name = this.profileForm.value.name || '';
    this.product.category = this.profileForm.value.category || '';
    this.product.price = this.profileForm.value.price || 0;
    this.product.description = this.profileForm.value.description || '';

    this.store.dispatch(
      ProductActions.updateProduct({
        product: this.product,
        id: this.id as number,
      })
    );
  }
}
