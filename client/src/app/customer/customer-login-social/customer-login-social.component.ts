import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';

@Component({
  selector: 'app-customer-login-social',
  templateUrl: './customer-login-social.component.html',
  styleUrls: ['./customer-login-social.component.css']
})
export class CustomerLoginSocialComponent implements OnInit {
  public user: any = SocialUser;

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  facebooklogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
    });
  }

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log(userData);
      this.user = userData;
    });
  }

}
