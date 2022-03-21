import { Component, OnInit, Input } from '@angular/core';
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

  @Input() cartProduct: CartProduct = new CartProduct;
  // product: Product = new Product;
  
  constructor(private productService: ProductsService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  quantityChange(event: any): void{

    //get the new quantity from the number input
    let newQuantity = Number(event.target.value);

    //in case there is a problem with the input check if the value exists
    if(newQuantity){

      //create a new product object because that is what will be needed in addProduct of cart service
      let product: Product = new Product;
      //use the product service to get the observable of the products
      this.productService.getProducts().subscribe( products => {
        //asign the product object to the product that matches by id with the id of this cartProduct 
        product = products.find(p => p.id === this.cartProduct.id) as Product;
        //use the cart service to add the found product and the new quantity 
        this.cartService.addProduct(product, newQuantity);
      })

    }else{
      alert("Sorry, there was a problem with changing quantity. Please try again.");
    }
    //console.log(this.cartService.total);
  }
}
