import { Component, OnInit, Injectable } from '@angular/core';
import { Post } from './post';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products = new Array<Post>();
  productSubscription: Subscription | undefined;
  constructor( private productService: ProductService) {}

  ngOnInit(): void {
   this.getProducts();
  }

  getProducts(){
     this.productSubscription = this.productService.getProducts().subscribe((data) => this.products = data);
  }
   onLeave()
   {
     this.productSubscription?.unsubscribe();
   }
}
