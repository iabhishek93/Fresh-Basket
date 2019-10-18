import { Component, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../Services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: Product
  //cartCount = 0;
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    //this.cartCount++;
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart() {
    //this.cartCount--;
    this.shoppingCartService.removeFromCart(this.product);
  }
}