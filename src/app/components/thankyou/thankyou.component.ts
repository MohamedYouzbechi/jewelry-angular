import { OrderService } from './../../services/order.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent {
  message: string;
  orderId: number;
  products: ProductResponseModel[] = [];
  cartTotal: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    this.products = state.products;
    // console.log(this.products);
    this.orderId = state.orderId;
    this.cartTotal = state.total;
  }

}

interface ProductResponseModel {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantityOrdered: number;
}
