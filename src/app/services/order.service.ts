import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponseModel[] = [];
  private serverUrl = environment.SERVER_URL;

  constructor(private httpClient:HttpClient) { }

  getSingleOrder(orderId: number) {
    return this.httpClient.get<ProductResponseModel[]>(this.serverUrl + '/orders/' + orderId).toPromise();
  }

}


interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantityOrdered: number;
  image: string;
}
