import { ShoppingCartItem } from "./shopping-cart-items";
import { Product } from './product';

// export interface ShoppingCart {
//     items: ShoppingCartItem[];
// }

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: Product }) {
        //Product
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item, item.quantity));
        }
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
           sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count = count + this.itemsMap[productId].quantity;
        }
        return count;
    }

    getQuantity(product) {
        let item = this.itemsMap[product.id];
        return item ? item.quantity : 0
    }
}

//public items:ShoppingCartItem[]

    // get productIds(){
    //     return Object.keys(this.items);
    // }