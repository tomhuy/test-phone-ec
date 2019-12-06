import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResponseContentType } from '../common/enums/http-enums';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class HttpClientCustom {
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';
  // private baseUrl = '';

  tokenValue: any;
  constructor(private http: HttpClient
    , private authSvc: AuthenticationService
    , private router: Router) { }



  createAuthorizationHeaderForUploading(headers: HttpHeaders) {
    //headers.append('Authorization', 'Bearer ' + this.authSvc.token);
  }

  getBlob(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers,
      responseType: ResponseContentType.Blob
    });
  }
  postBlob(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers,
      responseType: ResponseContentType.Blob
    });
  }

  get(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl + url, {
      headers: headers,
    });

  }
  createAuthorizationHeader(headers: HttpHeaders) {
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Authorization', this.authSvc.getTokenAdmin());
    // this.tokenValue = JSON.parse(this.authSvc.getTokenAdmin());
    // headers.append('Authorization', this.tokenValue);
    return headers;
  }

  post(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    // .append('Authorization', JSON.parse(this.authSvc.getTokenAdmin()));

    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.post(this.baseUrl + url, data, {
      headers: headers,
    });
  }

  put(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.put(this.baseUrl + url, data, {
      headers: headers,
    });
  }

  delete(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    let headers = new HttpHeaders();
    headers = this.createAuthorizationHeader(headers);
    return this.http.delete(this.baseUrl + url, {
      headers: headers,
    });
  }

  upload(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders()
    // this.createAuthorizationHeaderForUploading(headers);
    return this.http.post(this.baseUrl + url, data, {
      headers: headers,
    });
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }
}
