import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

import { LoginService } from '../login.service';

@Injectable({ providedIn: 'root' })
export class AccessGuard implements CanActivate {

    nivel_acesso: any;

    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.loginService.userAccess == 'admin') {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/compra'], /*{ queryParams: { returnUrl: state.url }}*/);
        return false;
    }
}