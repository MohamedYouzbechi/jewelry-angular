import { CartModelServer } from './../../models/cart.model';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartTotal: number;
  cartData: CartModelServer;
  userId;
  model: any = {};

  constructor(private cartService: CartService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  onCheckout() {
    if (this.cartTotal > 0) {
      this.spinner.show().then(p => {
        this.cartService.CheckoutFromCart(22);
      });
    } else {
      return;
    }
  }

  formSubmit() {
    console.log(this.model);
  }

}
