import { Injectable } from '@angular/core';
import { throwError, timer, Observable, } from 'rxjs';
import { catchError, map, switchMap, debounceTime } from 'rxjs/operators';
import { HttpClientCustom } from './http-client';

@Injectable()
export class DataService {
  constructor(private client: HttpClientCustom) { }

  async addItem(url: any, model: any) {
    const res: any = await this.client.post(url, model).pipe(
      catchError(this.handleError)
    ).toPromise();
    return res;
  }

  async getItems(url: string, model: any) {
    const res: any = await this.client.post(url, model).pipe(
      catchError(this.handleError)
    ).toPromise();
    return res;
  }

  async getItemByID(url: string) {
    const res: any = await this.client.get(url).pipe(
      catchError(this.handleError)
    ).toPromise();
    return res;
  }

  async deleteItem(url: string) {
    const res: any = await this.client.delete(url).pipe(
      catchError(this.handleError)
    ).toPromise();
    return res;
  }

  async updateItem(url: string, model: any) {
    const res: any = await this.client.put(url, model).pipe(
      catchError(this.handleError)
    ).toPromise();
    return res;
  }

  handleError(error) {
    return throwError(error);
  }
}
