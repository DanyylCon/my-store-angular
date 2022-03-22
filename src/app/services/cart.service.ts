import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { CartProduct } from '../models/CartProduct';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  customerName: string = '';
  cartProducts: CartProduct[] = [];
  total: number = 0;

  constructor() { }

  //Function to add a product to the cart with the correct quantity
  addProduct(product: Product, quantity: number): void{

    //find if a product user is trying to add is already in the cartProducts array
    const prodToAdd = this.cartProducts.find(p => p.id == product.id);

    //if the product user is trying to add, already exists in the array
    if(prodToAdd){
      //filter the array, remove the product 
      this.cartProducts = this.cartProducts.filter(p => p.id != prodToAdd.id);
      //add the product again, but with the new supplied quantity (in case it changed)
      this.cartProducts.push( {id: prodToAdd.id, url: prodToAdd.url, name: prodToAdd.name, price: prodToAdd.price, quantity: quantity} );
    }else{
      //if the product is not already in the cart, add it to the cartProducts array
      this.cartProducts.push( {id: product.id, url: product.url, name: product.name, price: product.price, quantity: quantity} )
      alert('Product was added to the cart!');
    }
    
    this.calculateTotal();

  }

  //function to calculate total price in the cart
  calculateTotal(): void{
    this.total = 0;
    for( let p of this.cartProducts){
      this.total = this.total + (p.price * p.quantity);
    }
    this.total = Math.round(this.total * 100) / 100;
  } 

  getCartProducts(): CartProduct[] {
    return this.cartProducts;
  }
}
