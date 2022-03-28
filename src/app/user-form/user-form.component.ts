import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  //variables to bind with ngModel
  name: string = '';
  address: string = '';
  card: string = '';

  //Regular expression and boolean for checking the the input in the card text input
  regex: RegExp = new RegExp(/^[0-9]{16}$/);
  validCardNum: boolean = false;

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

  //Trigger ngModelChange and run this function which checks if the input
  //the user has entered passes against the regular expression and sets it 
  //to the validCardNum boolean
  //This has nothing to do with the way the application works and is simply
  //to include ngModelChange in the project
  checkValidNumber(value: any){
    this.validCardNum = this.regex.test(value);
  }


}
