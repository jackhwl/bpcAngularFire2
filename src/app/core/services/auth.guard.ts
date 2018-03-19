import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService ) { }

    canActivate(): Observable<boolean> {
        return this.authService.user$
            .map(user => {
                if (user && user.uid) {
                    console.log('user is logged in');
                    return true;
                } else {
                    console.log('user not logged in');
                    this.router.navigate(['/admin/login']);
                    return false;
                }
            });
    }
}