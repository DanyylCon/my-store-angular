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
    this.cartService.customerName = this.name;
    this.router.navigate(['confirmation']);
  }
}
