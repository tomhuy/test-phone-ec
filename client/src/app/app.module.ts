import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';
import { AdminModule } from './admin/admin.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DataService } from './services/data-service';
import { HttpClientCustom } from './services/http-client';
import { LoadScriptService } from './services/load-scripts.service';




const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)},
  { path: '',   redirectTo: '/customer/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    // ProfileComponent,
    // LoginComponent,
    // RegisterComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    RouterModule.forRoot(routes),
    AuthModule,
    CustomerModule,
    AdminModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardAdminService,
    AuthGuardService,
    DataService,
    HttpClientCustom,
    LoadScriptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
