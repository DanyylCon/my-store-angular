import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProduct } from '../models/CartProduct';
import { Product } from '../models/Product';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  //get the cartProduct from the parent component
  @Input() cartProduct: CartProduct = new CartProduct;
  //EventEmitter used to notify the parent component if the quantity changes
  @Output() quantityNotify: EventEmitter<any> = new EventEmitter;
  
  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  quantityChange(event: any): void{

    //get the new quantity from the number input
    let newQuantity = Number(event.target.value);


    if(newQuantity){

      let product: Product = new Product;

      //use the product service to get the observable of the products
      //asign the product object to the product that matches by id with the id of this cartProduct 
      //use the cart service to add the found product and the new quantity 
      //use the EventEmitter to notify the parent component of the change of quantity
      this.productService.getProducts().subscribe(  products => {
        product = products.find(p => p.id === this.cartProduct.id) as Product;
         this.cartService.addProduct(product, newQuantity);
         this.quantityNotify.emit();
      })

    }else{
      alert("Sorry, there was a problem with changing quantity. Please try again.");
    }
  }
}
