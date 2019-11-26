import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// component
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginOtherAccountComponent } from './login-other-account/login-other-account.component';

// service
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { FormsModule } from '@angular/forms';

// config import for login
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';
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
    LoginComponent,
    RegisterComponent,
    LoginOtherAccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SocialLoginModule,
    AuthRoutingModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    { provide: AuthServiceConfig, useFactory: provideConfig }
  ]
})
export class AuthModule { }
