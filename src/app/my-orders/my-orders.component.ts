import { Component } from '@angular/core';
import { OrderService } from './../Services/order.service';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}