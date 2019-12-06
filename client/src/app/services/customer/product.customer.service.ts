import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Product } from 'src/app/models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductCustomerService {
  product: Product;
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';
  // private baseUrl = '';
  // productID: string;
  productID = '5dbaf033dee8d12a048edce1';

  private _ProductID: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getProductID$: Observable<string> = this._ProductID.asObservable();

  constructor(private http: HttpClient) { }

  getProduct(option): any {
    return this.http.post(this.baseUrl + '/api/product/get', option);
  }
  uploadAnh(option): any {
    return this.http.post(this.baseUrl + '/api/product/upload', option);
  }

  getProductByID(_id: string) {
    return this.http.get(this.baseUrl + '/api/product' + `/${_id}`);
  }

  setProductID(_id: string) {
    // this._ProductID.next(_id);
    this.productID = _id;
  }


}
