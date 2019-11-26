import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class categoryService {

  // readonly baseURL = '/api/';

  constructor(private http: HttpClient) { }

  getType(option): any {
    return this.http.post('/api/typeproduct/get', option);
  }

  getProduct(option): any {
    return this.http.post('/api/product/get', option);
  }
  getProductFilter(option): any{
    return this.http.post('/api/product/filter', option);
  }

  getBrand(option): any {
    return this.http.post('/api/brand/get', option);
  }

  filter() {

  }


}
