import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerCategoryComponent } from './customer-category/customer-category.component';
import { CustomerCartComponent } from './customer-cart/customer-cart.component';
import { CustomerProductDetailComponent } from './customer-product-detail/customer-product-detail.component';
import { CustomerLoginSocialComponent } from './customer-login-social/customer-login-social.component';
import { CustomerCheckoutComponent } from './customer-checkout/customer-checkout.component';
import { CustomerTrackingComponent } from './customer-tracking/customer-tracking.component';
import { TrackingShowComponent } from './customer-tracking/tracking-show/tracking-show.component';

//
const routes: Routes = [
  {
    path: '', component: CustomerLayoutComponent, children: [
      { path: 'home', component: CustomerHomeComponent },
      { path: 'category', component: CustomerCategoryComponent },
      { path: 'tracking', component: CustomerTrackingComponent },
      { path: 'detail/:detailpro', component: CustomerProductDetailComponent },
      { path: 'trackshow/:orderid', component: TrackingShowComponent },
      { path: 'cart', component: CustomerCartComponent },
      { path: 'checkout', component: CustomerCheckoutComponent },
      { path: 'profile', component: CustomerProfileComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: CustomerLoginSocialComponent },
      { path: '', component: CustomerHomeComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //AuthGuardService,
    //AuthenticationService
  ]
})
export class CustomerRoutingModule { }
