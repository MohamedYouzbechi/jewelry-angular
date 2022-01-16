import { ServerResponse, ProductModelServer } from './../models/product.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private SERVER_URL = environment.SERVER_URL;

  constructor(private httpClient: HttpClient) {}

  /* This is to fetch all products from the backend server */
  getAllProducts(numberOfResults= 10) : Observable<ServerResponse> {
    return this.httpClient.get<ServerResponse>(this.SERVER_URL + '/products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  /* GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.httpClient.get<ProductModelServer>(this.SERVER_URL + '/product/' + id);
  }

  /*GET PRODUCTS FROM ONE CATEGORY */
  getProductsFromCategory(catName: string) : Observable<ServerResponse>  {
    return this.httpClient.get<ServerResponse>(this.SERVER_URL + '/products/category/' + catName);
  }
}
