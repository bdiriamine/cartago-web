import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isSignedIn: any;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.authServ.isLoggedIn;
    this.authServ.castSignedIn.subscribe(si => {
      this.isSignedIn = si
    })
    if (!this.isSignedIn) {
      this.router.navigateByUrl('/');
      return false;
    }

    return true;
  }

}
