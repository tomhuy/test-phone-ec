import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { storeInfo } from 'src/app/models/storeInfo.model';
@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {

  storeInfo: storeInfo;
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';

  constructor(private http: HttpClient) { }

  getStoreInfo() {
    return this.http.get(this.baseUrl + '/api/info');
  }


}
