import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrong = false;

  credentials: TokenPayload = {
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
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/customer/home');
    }
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      (res) => {
        if (res.error) {
          this.wrong = true;
        } else {
          this.router.navigateByUrl('/customer/home');
        }

      },
      err => {
        console.error(err);
      }
    );
  }
}
