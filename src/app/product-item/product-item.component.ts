import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  id: Number = 0;
  product: Product = new Product;
  selectOptions = [1,2,3,4,5,6,7,8,9];
  selectedQuantity = 1;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private cartService: CartService) {   
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productsService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id == this.id) as Product
    })
  }

  addProduct(){
    this.cartService.addProduct(this.product, this.selectedQuantity);
  }
  
  selectChange(event: any): void{
    if(!event.target.value){
      this.selectedQuantity = 1;
    }else{
      this.selectedQuantity = Number(event.target.value);
    }
    console.log(this.selectedQuantity);
  }


}
