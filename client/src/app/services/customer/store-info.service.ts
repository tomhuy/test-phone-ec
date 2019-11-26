import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { storeInfo } from 'src/app/models/storeInfo.model';
@Injectable({
  providedIn: 'root'
})
export class StoreInfoService {

  storeInfo: storeInfo;
  readonly baseURL = 'api/info';

  constructor(private http: HttpClient) { }

  getStoreInfo() {
    return this.http.get(this.baseURL);
  }


}
