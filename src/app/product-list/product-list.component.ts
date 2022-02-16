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
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  };

  addProduct(product: Product, quantity: number): void {
    this.cartService.addProduct(product, this.selectedQuantity);
  };

  selectChange(event: any): void{
    if(!event.target.value){
      this.selectedQuantity = 1;
    }else{
      this.selectedQuantity = Number(event.target.value);
    }

  }

}
