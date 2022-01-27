import { OrderModelServer } from './../models/order.model';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient:HttpClient) { }

  getAllOrders(): Observable<OrderModelServer[]> {
    return this.httpClient.get<OrderModelServer[]>('http://localhost:3000/orders');
  }

  deleteOrder(orderId) {
    return this.httpClient
      .delete<{ message?: string; status: string }>(
        `http://localhost:3000/order/${orderId}`
      )
      .pipe(
        switchMap(async (data) => {
          const orders = await this.getAllOrders().toPromise();
          return {
            ...data,
            orders : orders,
          };
        })
      );
  }
}
