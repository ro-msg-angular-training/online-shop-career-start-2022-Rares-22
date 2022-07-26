import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './product/post';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.url + '/products');
  }

  save(product: Post): Observable<Post> {
    return this.http.post<Post>(environment.url, product);
  }

  updateProduct(product: Post, id: number): Observable<Post> {
    return this.http.put<Post>(environment.url + `/products/${id}`, product);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(environment.url + `/products/${id}`);
  }

  deleteProduct(id: number): Observable<Post> {
    return this.http.delete<Post>(environment.url + `/products/${id}`);
  }
}
