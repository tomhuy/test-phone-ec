import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceCustomerService {
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';
  constructor(
    private http: HttpClient
  ) { }

  getInvoiceByID(_id: string): any {
    return this.http.get(this.baseUrl + '/api/invoice/tracking' + `/${_id}`);
  }

}
