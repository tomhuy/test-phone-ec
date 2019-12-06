import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string,
  password: string
  address: string
  phoneNumber: number
  gender: boolean
  birthday: Date
  exp: number
  iat: number
}

export interface StaffDetails {
  _id: string
  name: string
  username: string
  password: string
  role: string
  email: string
  avatar: string
  gender: boolean
  dateOfBirth: Date
  exp: number
  iat: number
}

interface TokenResponse {   //token from the backend to frontend
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  address: string
  phoneNumber: number
  gender: boolean
  birthday: Date
}

export interface TokenPayloadAdmin {
  _id: string
  name: string
  username: string
  password: string
  role: string
  email: string
  avatar: string
  gender: boolean
  dateOfBirth: Date
}

@Injectable()
export class AuthenticationService {
  // private url = 'https://phone-shop-server-huybao.herokuapp.com';
  private baseUrl = 'https://phone-shop-server-huybao.herokuapp.com';
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  saveToken(token: string): void {
    localStorage.setItem('usertoken', token); // save token at storage browser in client
    this.token = token; // assign token variable
  }

  saveTokenAdmin(token: string): void {
    localStorage.setItem('admintoken', token); // save token at storage browser in client
    this.token = token; // assign token variable
  }

  getToken(): string {
    if (!this.token) { // check if this the token has existed
      this.token = localStorage.getItem('usertoken'); // if not: get token from browser client
    }
    return this.token;
  }


  getTokenAdmin(): string {
    if (!this.token) { // check if this the token has existed
      this.token = localStorage.getItem('admintoken'); // if not: get token from browser client
    }
    return this.token;
  }



  public getUserDetails(): UserDetails {
    const token = this.getToken(); // first get the token from localStorage
    let payload;
    if (token) {
      payload = token.split('.')[1] //
      payload = window.atob(payload) // decode base64 to string
      return JSON.parse(payload);  // then convert the string decoded to json
    } else {
      return null;
    }
  }

  public getStaffDetails(): StaffDetails {
    const token = this.getTokenAdmin(); // first get the token from localStorage
    let payload;
    if (token) {
      payload = token.split('.')[1] //
      payload = window.atob(payload) // decode base64 to string
      return JSON.parse(payload);  // then convert the string decoded to json
    } else {
      return null;
    }
  }

  // public checkUser(): any {
  //   const token = this.getToken(); // first get the token from localStorage
  //   let payload
  //   if (token) {
  //     payload = token.split('.')[1] //
  //     payload = window.atob(payload) // decode base64 to string
  //     return JSON.parse(payload);  // then convert the string decoded to json
  //   } else {
  //     return null;
  //   }
  // }



  // check user still alive or not
  public isLoggedIn(): boolean {
    const user = this.getUserDetails(); // code cu
    // const user = this.checkUser();
    if (user) {
      return user.exp > Date.now() / 1000; // code cu
      // console.log(user);
      // return true;
    } else {
      return false;
    }
  }

  public isLoggedInAdmin(): boolean {
    const admin = this.getStaffDetails(); // code cu
    // const user = this.checkUser();
    if (admin) {
      return admin.exp > Date.now() / 1000; // code cu

      // return true;
    } else {
      return false;
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.baseUrl + '/api/users/register', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data;
      })
    )
    return request;
  }

  public registersocial(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.baseUrl + '/api/users/registersocial', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data;
      })
    )
    return request;
  }

  // request to server to ask for token & then save token to local storage
  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(this.baseUrl + '/api/users/login', user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        } return data
      })
    )


    return request;
  }

  public loginAdmin(staff: TokenPayloadAdmin): Observable<any> {
    const base = this.http.post(this.baseUrl + '/api/staff/login', staff);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveTokenAdmin(data.token);
        }
        // console.log(data);
        return data;
      })
    )
    return request;
  }

  public profile(): Observable<any> {
    return this.http.get(this.baseUrl + `/api/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    });
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('usertoken');
    this.router.navigateByUrl('/');
  }

  public logoutAdmin(): void {
    this.token = '';
    window.localStorage.removeItem('admintoken');
    this.router.navigateByUrl('/admin/login');
  }
}
