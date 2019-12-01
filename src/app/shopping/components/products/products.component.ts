import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/Services/product.service';
import { ShoppingCartService } from 'shared/Services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCart: ShoppingCartService) {

    productService.getProduct().pipe(
      switchMap(
        products => {
          this.productsList = products.map(p => {
            const data = p.payload.val() as Product;
            const id = p.payload.key;
            this.productsList.push({ id, ...data });
            return { id, ...data }
          })
          return route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.productsList.filter(p => p.category === this.category) :
          this.productsList;
        document.getElementById('products-cart').scrollIntoView({ behavior: "smooth", block: "start", inline: "start" })
      });

  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCart.getCart())
      .subscribe(cart => this.cart = cart);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}