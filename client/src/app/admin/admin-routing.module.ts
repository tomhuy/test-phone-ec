import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ProductTypeListComponent } from './product-type/product-type-list/product-type-list.component';
import { SettingInformationListComponent } from './setting-information/setting-information-list/setting-information-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuardAdminService } from '../services/auth-guard-admin.service';
import { BrandListComponent } from './brand/brand-list/brand-list.component';


const routes: Routes = [
  { path: 'login', component: AdminLoginComponent},
  { path: 'admin', component: AdminLayoutComponent, children: [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardAdminService]},
    { path: 'product', component: ProductListComponent, canActivate: [AuthGuardAdminService]},
    { path: 'brand', component: BrandListComponent, canActivate: [AuthGuardAdminService]},
    { path: 'order', component: OrderListComponent, canActivate: [AuthGuardAdminService]},
    { path: 'customer', component: CustomerListComponent, canActivate: [AuthGuardAdminService]},
    { path: 'profile', component: AdminProfileComponent, canActivate: [AuthGuardAdminService]},
    { path: 'product-type', component: ProductTypeListComponent, canActivate: [AuthGuardAdminService]},
    { path: 'settings', component: SettingInformationListComponent, canActivate: [AuthGuardAdminService]},
    { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuardAdminService] },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //AuthGuardService,
    //AuthenticationService
  ]
})
export class AdminRoutingModule { }
