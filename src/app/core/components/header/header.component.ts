import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/Services/auth.service';
import { ShoppingCartService } from 'shared/Services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { CommonService } from './../../Services/common.service';
import { CategoryService } from 'shared/Services/category.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input('hide-content')
  set content(value: number) {
    this.toggleFilter = false;
    this.toggleFilterData();
    this.toggleSideNav = true;
    this.toggleNavButton();
  }

  categories$;
  toggleFilter = false;
  appUser: AppUser;
  //shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;
  toggleSideNav = false;

  constructor(private categoryService: CategoryService, private comonService: CommonService, private authService: AuthService, private shoppingCartService: ShoppingCartService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
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

  toggleNavButton() {
    this.toggleSideNav ? document.getElementById("mySidebar").style.width = "0" : document.getElementById("mySidebar").style.width = "250px";
    this.toggleSideNav = !this.toggleSideNav;
    this.toggleFilter = false;
  }

  toggleFilterData(){
    this.toggleFilter=!this.toggleFilter;
    if (this.toggleSideNav) {
      this.toggleSideNav = false;
      document.getElementById("mySidebar").style.width = "0" 
    }
  }
}

