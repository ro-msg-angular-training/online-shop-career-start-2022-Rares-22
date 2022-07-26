import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

import { DetailsComponent } from './details/details.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './cart/cart.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { EditFormComponent } from './edit-form/edit-form.component';
import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/products/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/products/product.effects';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'  ;

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DetailsComponent,
    CartComponent,
    EditFormComponent,
    NewProductComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot({ products: productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    MatSliderModule,
    MatIconModule,
    MatTableModule,
      ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
