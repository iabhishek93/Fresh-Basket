import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/Services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderService } from 'shared/Services/order.service';
import { AuthService } from 'shared/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {
    city: "",
    name: "",
    address: ""
  };
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(x => this.cart = x)
    this.userSubscription = this.authService.user.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shippingInfo: this.shipping,
      items: this.cart.items.map(item => {
        return {
          product: {
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.product.price,
          },
          quantity: item.product.quantity,
          totalPrice: item.totalPrice
        }
      })
    };
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }
}