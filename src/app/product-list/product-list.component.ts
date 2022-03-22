import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  selectOptions = [1,2,3,4,5,6,7,8,9];
  selectedQuantity = 1;

  constructor(private productsService: ProductsService, private cartService: CartService) { 
  }

  ngOnInit(): void {
    //use productService to get the observable of products and assign it 
    //to the products array in this component
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  };

  //use cartService to add this product to the cartProducts array
  addProduct(product: Product): void {
    this.cartService.addProduct(product, this.selectedQuantity);
  };

  //change the selectedQuantity if the user changes it in the select tag
  selectChange(event: any): void{
    if(!event.target.value){
      this.selectedQuantity = 1;
    }else{
      this.selectedQuantity = Number(event.target.value);
    }
  }

}
