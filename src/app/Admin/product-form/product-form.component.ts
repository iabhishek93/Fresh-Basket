import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../Services/category.service';
import { ProductService } from './../../Services/product.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = <any>{};
  id;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) {

    this.categories$ = categoryService.getCategories().snapshotChanges();

    this.id = this.route.snapshot.paramMap.getAll('id');

    if (this.id) {
      this.productService.retrieveProduct(this.id)
        .pipe(take(1)).subscribe(p => { this.product = p })
    }
  }

  save(product) {

    if (this.id.length) {
      this.productService.updateProduct(this.id, product);
    }

    else this.productService.createProduct(product);


    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
