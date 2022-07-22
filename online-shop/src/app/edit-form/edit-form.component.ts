import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../product/post';
import { FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  product: Post = {
    id: 0,
    name: '',
    category: '',
    image: '',
    price: 0,
    description: '',
  };

  id = parseInt(this.route.snapshot.paramMap.get('id') as string);

  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['', [Validators.required, Validators.nullValidator]],
    price: [0, [Validators.required, Validators.nullValidator]],
    description: ['', [Validators.required, Validators.nullValidator]],
  });

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {

    this.productService
      .getById(this.id)
      .subscribe((data) => {
        this.product = data;
        this.profileForm.patchValue(this.product);
      });
  }

  save() {
    this.product.name = this.profileForm.value.name || '';
    this.product.category = this.profileForm.value.category || '';
    this.product.price = this.profileForm.value.price || 0;
    this.product.description = this.profileForm.value.description || '';
    this.productService.updateProduct(this.product, this.id).subscribe();
  }
}
