import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined; 
    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }

      alreadyExistsInCart = (existingCartItem != undefined)

      if(alreadyExistsInCart) {
        existingCartItem.quantity++;
      } else {
        this.cartItems.push(theCartItem); 
      }
      this.computeCartTotal(); 
    }
  } 

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currrentCartItem of this.cartItems) {
      totalPriceValue += currrentCartItem.quantity * currrentCartItem.unitPrice;
      totalQuantityValue += currrentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue); 
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice; 
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, 
      unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`); 
    }
    console.log(`totalPrice=${totalPriceValue.toFixed(2)}, totalQuantity=${totalQuantityValue}`);
    console.log('----'); 
  }
}
