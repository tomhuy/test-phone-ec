import {Injectable, Inject} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardAdminService implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate() {
      if (!this.auth.isLoggedInAdmin()) {
        this.router.navigateByUrl('/admin/login');
        return false;
      }
      return true;
    }
}
