import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  customerName: string = ''
  orderTotal: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    //receive the variables from cartService after they were set in userForm and Cart components
    this.customerName = this.cartService.customerName;
    this.orderTotal = this.cartService.total;
  }

  //when user clicks, empty out the cartProducts array, reset total, customerName and return to the main page
  returnToProdList(): void{
    this.cartService.cartProducts = [];
    this.cartService.total = 0;
    this.cartService.customerName = '';
    this.router.navigate(['']);
  }

}
