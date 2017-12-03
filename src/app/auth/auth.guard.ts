import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return this.auth.user
    //   .take(1)
    //   .map(user => !!user)
    //   .do(loggedIn => {
    //     debugger
    //     if (!loggedIn) {
    //       console.log('access denied')
    //       this.router.navigate(['/']);
    //     }
    //   })
    if (localStorage.ums == 'true') {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
      // if (this.auth.isUserAuthenticated() !== null) return true
      // else {
      //   this.router.navigate(['/']);
      //   return false
      // }
    }
}
