import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-other-account',
  templateUrl: './login-other-account.component.html',
  styleUrls: ['./login-other-account.component.css']
})
export class LoginOtherAccountComponent implements OnInit {
  public user: any = SocialUser;

  credentails: TokenPayload = {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: 0,
    gender: true,
    birthday: new Date()
  };

  constructor(
    private socialAuthService: AuthService,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  facebooklogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(async (userData) => {
      this.user = userData;
      await this.buildArg(userData);
      this.register();
      // console.log(this.user);
      this.router.navigateByUrl('/customer/home');
    });
  }

  buildArg(userData) {
    let fullname = userData.name.split(' ');
    this.credentails.first_name = fullname[0];
    this.credentails.last_name = fullname[fullname.length - 1]
    this.credentails.email = userData.email;
    this.credentails.password = '123';
  }

  register() {
    this.auth.registersocial(this.credentails).subscribe(
      () => {
        this.router.navigateByUrl('/customer/home');
      },
      err => {
        console.error(err);
      }
    );
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(async (userData) => {
      this.user = userData;
      await this.buildArg(userData);
      this.register();
      // console.log(this.user);
      this.router.navigateByUrl('/customer/home');
    });
  }
}
