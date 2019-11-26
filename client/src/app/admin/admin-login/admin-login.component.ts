import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayloadAdmin } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  wrong = false;

  credentials: TokenPayloadAdmin = {
    _id: '',
    name: '',
    username: '',
    password: '',
    role: '',
    email: '',
    avatar: '',
    gender: true,
    dateOfBirth: new Date()
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    this.auth.loginAdmin(this.credentials).subscribe(
      (data) => {
        if (data.error) {
          this.wrong = true;
          // console.log('er');
        } else {
          this.router.navigateByUrl('/admin/dashboard');
        }
        // console.log(data.error);
      },
      err => {
        console.error(err);
      }
    );
  }


}
