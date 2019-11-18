import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/Services/auth.service';
import { ShoppingCartService } from 'shared/Services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CommonService } from './../../Services/common.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  appUser: AppUser;
  //shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private comonService:CommonService,private authService: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();

  }

  open() {
   this.comonService.openModal('1');
  }

}

