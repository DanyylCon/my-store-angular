import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  name: string = '';
  address: string = '';
  card: string = '';

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  submitForm(): void{
    //basic validation to check if cart is not empty, if it is not then
    //pass the customer name to cartSerice and navigate to confirmation
    if(this.cartService.cartProducts.length){
      this.cartService.customerName = this.name;
      this.router.navigate(['confirmation']);
    }else{
      alert("Please place something in your cart first!");
    }
  }
}
