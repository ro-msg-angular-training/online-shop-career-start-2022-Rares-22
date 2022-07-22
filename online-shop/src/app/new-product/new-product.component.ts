import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../product/post';
import { FormBuilder} from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
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
    private productService: ProductService
  ) {}

  ngOnInit(): void {
  }

  save() {
    this.product.name = this.profileForm.value.name || '';
    this.product.category = this.profileForm.value.category || '';
    this.product.price = this.profileForm.value.price || 0;
    this.product.description = this.profileForm.value.description || '';
    this.productService.save(this.product).subscribe();
  }
}

