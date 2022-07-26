import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { NewProductComponent } from './new-product/new-product.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  {
    path: 'products/:id',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-form/:id',
    component: EditFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-product',
    component: NewProductComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
