import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  createProduct(product){
    return this.db.list('/products').push(product);
  }

  getProduct(){
    return this.db.list('/products').snapshotChanges();
  }

  retrieveProduct(productId){
    return this.db.object('/products/' +productId).valueChanges();
  }

  updateProduct(productId,product){
    return this.db.object('/products/' +productId).update(product);
  }

  deleteProduct(productId){
    return this.db.object('/products/' +productId).remove();
  }

}
