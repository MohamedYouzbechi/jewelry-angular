import { ServerResponse } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<{count: number, products: ServerResponse[]}> {
    return this.httpClient.get<{count: number, products: ServerResponse[]}>('http://localhost:3000/products');
  }

  deleteProduct(productId): Observable<any> {
    return this.httpClient
      .delete<{ message?: string; status: string }>(
        `http://localhost:3000/product/${productId}`
      )
      .pipe(
        switchMap(async (data) => {
          const prods = await this.getAllProducts().toPromise();
          return {
            ...data,
            ...prods,
          };
        })
      );
  }

  editProduct(productId, product, img:File): Observable<any>{
    let formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('short_desc', product.short_desc);
    formData.append('cat_id', product.cat_id);
    formData.append('image', img);

    return this.httpClient
      .patch<{ message?: string; status: string }>(`http://localhost:3000/product/${productId}`, formData);
  }

  getProductById(productId): Observable<any>{
    return this.httpClient
      .get(`http://localhost:3000/product/${productId}`);
  }


  addProduct(product, img:File): Observable<any>{
    let formData = new FormData(); //on doit envoyer FormData au BE car JSON ne comporte pas les files
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('short_desc', product.short_desc);
    formData.append('cat_id', product.cat_id);
    formData.append('image', img);

    return this.httpClient
      .post<{ message?: string; status: string }>(`http://localhost:3000/addProduct`, formData);
  }
}
