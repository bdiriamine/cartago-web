import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualGuard implements CanActivate {
  allowedVirtuel = false;
  isSignedIn
  constructor(private authServ: AuthService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authServ.isLoggedIn;
    this.authServ.castSignedIn.subscribe(si => {
      this.isSignedIn = si
    })


    this.authServ.virtuel.subscribe(res => {
      this.allowedVirtuel = res
      if (this.isSignedIn) {
        if (this.allowedVirtuel == false)
          this.route.navigate(['/']);
      }

    });


    return true;
  }
}