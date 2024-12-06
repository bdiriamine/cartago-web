import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CasinoGuard implements CanActivate {
  allowedGame = false;
  allowedGameShow = false;
  allowedVirtuel = false;
  isSignedIn: any;

  constructor(private authServ: AuthService, private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authServ.isLoggedIn;
    this.authServ.castSignedIn.subscribe(si => {
      this.isSignedIn = si
    })



    this.authServ.game.subscribe(res => {

      this.allowedGame = res
      if (this.isSignedIn) {
        if (this.allowedGame == false)
          this.route.navigate(['/']);
      }

    });


    return true;
  }
}