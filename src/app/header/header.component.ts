import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from './../models/app-user';
import { AuthService } from './../Services/auth.service';
import { ShoppingCartService } from './../Services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appUser: AppUser;
  //shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();

    // let cart$ = await this.shoppingCartService.getCart();

    // cart$.snapshotChanges()
    //   .subscribe(cart => {
    //     this.shoppingCartItemCount = 0;
    //     for (let productId in cart.payload.val().items) {
    //       this.shoppingCartItemCount += cart.payload.val().items[productId].quantity;
    //     }
    //   });

  }
}
