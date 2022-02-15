import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/Product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  id: Number = 0;
  product: Product = new Product;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) {   
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.productsService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id == this.id) as Product
      console.log(this.product.url)
    })
    

  }

}
