import { Injectable } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.addProduct),
      mergeMap(({ product }) => {
        return this.productService.save(product).pipe(
          map((product) => ProductActions.addProductSuccess({ product })),
          catchError(() => of(ProductActions.getProductError()))
        );
      })
    );
  });

  getProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProduct),
      mergeMap(({ productId }) => {
        return this.productService.getById(productId).pipe(
          map((product) => ProductActions.getProductSuccess({ product })),
          catchError(() => of(ProductActions.getProductError()))
        );
      })
    );
  });

  getProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getProducts),
      mergeMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => ProductActions.getProductsSuccess({ products })),
          catchError(() => of(ProductActions.getProductsError()))
        );
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product, id }) => {
        return this.productService.updateProduct(product, id).pipe(
          map(() => ProductActions.updateProductSuccess({ product })),
          catchError(() => of(ProductActions.updateProductError()))
        );
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({productId: id}) => {
        return this.productService.deleteProduct( id).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError(() => of(ProductActions.deleteProductError()))
        );
      })
    );
  });
}
