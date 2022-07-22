import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
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
  ) {}

  canEdit = this.authService.hasRole('admin');
  canAdd = this.authService.hasRole('customer');

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') as string);

    this.productSubscription = this.productService.getById(id)
      .subscribe((data) => (this.product = data as Post | null));
  }

  deleteProduct(product: Post | null) {
    if (product)
      this.productService.deleteProduct(product.id)
        .subscribe();
  }

  addToCart(product: Post | null) {
    this.cartService.addToCart(product);
  }

  onLeave()
  {
    this.productSubscription?.unsubscribe();
  }
}
