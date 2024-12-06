import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedAmountGuard implements CanActivate {

  blocked: any;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.blocked === undefined) {
      this.blocked = this.authServ.isBlocked
    }
    this.authServ.blocked.subscribe((res: any) => {
      this.blocked = res

    })
    if (this.blocked == true) {
      this.router.navigateByUrl('/home');
      return false;
    }
    return true;
  }

}
