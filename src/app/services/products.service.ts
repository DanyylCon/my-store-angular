import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  //using the HttpClient module return an Observable array of type Product
  //by getting it from a json file provided 
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/data.json');
  }
}
