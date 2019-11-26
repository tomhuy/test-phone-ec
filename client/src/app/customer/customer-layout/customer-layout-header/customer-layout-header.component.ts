import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { storeInfo } from 'src/app/models/storeInfo.model';
import { StoreInfoService } from 'src/app/services/customer/store-info.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-customer-layout-header',
  templateUrl: './customer-layout-header.component.html',
  styleUrls: ['./customer-layout-header.component.css']
})
export class CustomerLayoutHeaderComponent implements OnInit {
  info: storeInfo;
  isLogin = false;
  user: any;
  constructor(
    private storeInfoService: StoreInfoService,
    private auth: AuthenticationService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getInfo();
    this.isLogin = this.auth.isLoggedIn();
    if (this.isLogin) {
      this.user = this.auth.getUserDetails();
      console.log(this.user);
    }

  }

  async getInfo() {
    let info = await this.storeInfoService.getStoreInfo().subscribe((res) => {
      this.info = res[0] as storeInfo;
    });
  }
  logout() {
    this.auth.logout();
    this.isLogin = false;
    this.route.navigateByUrl('/customer/home');
  }

  toCategory(link: string) {
    this.route.navigateByUrl(link);
  }
  toCart(link: string) {
    this.route.navigateByUrl(link);
  }
  toHome(link: string) {
    this.route.navigateByUrl(link);
  }



}
