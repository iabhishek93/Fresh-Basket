import { Product } from './product';

// export interface ShoppingCartItem {
//     product: Product;
//     quantity: number;
// }

export class ShoppingCartItem {
    
    // title:string;
    // price: number;
    // category: string;
    // imageUrl: string;
    // id?: string;
    // quantity:number;

    constructor(public product: Product, public quantity: number){}
    get totalPrice() {
        return this.product.price * this.quantity;
    }
}