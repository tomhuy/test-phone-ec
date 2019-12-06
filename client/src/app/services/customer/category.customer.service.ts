import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class categoryService {
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';

  // readonly baseURL = '/api/';

  constructor(private http: HttpClient) { }

  getType(option): any {
    return this.http.post(this.baseUrl + '/api/typeproduct/get', option);
  }

  getProduct(option): any {
    return this.http.post(this.baseUrl + '/api/product/get', option);
  }
  getProductFilter(option): any {
    return this.http.post(this.baseUrl + '/api/product/filter', option);
  }

  getBrand(option): any {
    return this.http.post(this.baseUrl + '/api/brand/get', option);
  }

  filter() {

  }


}
