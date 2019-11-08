import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/Services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscription: Subscription;


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getProduct()
      .subscribe(changes =>
        this.filteredProducts = changes.map(c => {
          const data = c.payload.val() as Product;
          const id = c.payload.key;
          this.products.push({ id, ...data });
          return { id, ...data };
        })
      );
  }

  filter(query: string) {
    this.filteredProducts = [];
    this.filteredProducts = (query) ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


}