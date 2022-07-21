import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  { path: 'products', component: ProductComponent },
  { path: 'products/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'edit-form/:id', component: EditFormComponent },
  { path: 'new-product', component: NewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
