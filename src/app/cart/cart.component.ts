import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../models/CartProduct';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: CartProduct[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    //get the cartProducts and total from the cart service
    this.cartProducts = this.cartService.getCartProducts();
    this.total = this.cartService.total;
  }   

  //recalculate the total when it is changed in the cartItem child component
  refreshTotal(): void{
    this.total = this.cartService.total;
  }

  //refresh the cart once the item was removed
  refreshCart(): void{
    this.cartProducts = this.cartService.getCartProducts();
    this.refreshTotal();
  }

}
