import { OrderModelServer } from './../../models/order.model';
import { OrderService } from './../../services/order.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: OrderModelServer[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  hasError = false;
  success = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
    }));

  }

  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  deleteOrder(id: number): void {
    this.subs.push(this.orderService.deleteOrder(id).subscribe(
      res => {
        if (res.status === 'success') {
          this.success = true;
          this.errorMessage = res.message;
        }

        this.orders = res.orders;
        // $('.alert').delay(1500).slideUp(1500);
        setTimeout(()=>{
          this.success = false;
        }, 1500)

      }, (err:HttpErrorResponse)=>{
        this.hasError = true;
        this.errorMessage = err.error.message ? err.error.message : err.error
        // $('.alert').delay(1500).slideUp(1500);
        setTimeout(()=>{
          this.hasError = false;
        }, 1500)
      }
    ));
  }
}
