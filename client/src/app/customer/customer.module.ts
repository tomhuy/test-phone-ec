import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule  } from '@angular/router';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerLayoutFooterComponent } from './customer-layout/customer-layout-footer/customer-layout-footer.component';
import { CustomerLayoutHeaderComponent } from './customer-layout/customer-layout-header/customer-layout-header.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCategoryComponent } from './customer-category/customer-category.component';
import { CustomerProductDetailComponent } from './customer-product-detail/customer-product-detail.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';

// services
import { StoreInfoService } from 'src/app/services/customer/store-info.service';
import { CartService } from 'src/app/services/customer/cart.customer.service';
import { InvoiceCustomerService } from 'src/app/services/customer/invoice.customer.service';
import { categoryService } from 'src/app/services/customer/category.customer.service';
import { ProductCustomerService } from 'src/app/services/customer/product.customer.service';
import { CustomerLoginSocialComponent } from './customer-login-social/customer-login-social.component';
import { CustomerCheckoutComponent } from './customer-checkout/customer-checkout.component';

// config import for login
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from "ng4-social-login";
import { CustomerTrackingComponent } from './customer-tracking/customer-tracking.component';
import { TrackingShowComponent } from './customer-tracking/tracking-show/tracking-show.component';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('574132387408-otlajskgtbt44qr3ii8t8qte9g0qgg52.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2800031220031228')
  }
], false);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    CustomerLayoutFooterComponent,
    CustomerLayoutHeaderComponent,
    CustomerLayoutComponent,
    CustomerHomeComponent,
    CustomerProfileComponent,
    CustomerCategoryComponent,
    CustomerProductDetailComponent,
    CustomerCartComponent,
    CustomerCheckoutComponent,
    CustomerLoginSocialComponent,
    CustomerTrackingComponent,
    TrackingShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  providers: [
    StoreInfoService,
    CartService,
    InvoiceCustomerService,
    categoryService,
    ProductCustomerService,
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ]
})
export class CustomerModule { }
