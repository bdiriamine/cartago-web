import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SocketServService } from '../services/socket-serv.service';

@Injectable({
  providedIn: 'root'
})
export class MiniGamesGuard implements CanActivate {
  isSignedIn: any;
  allowedGame: any;
  constructor(
    private route: Router,
    private authServ: AuthService,
    private sockerServ: SocketServService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isSignedIn = this.authServ.isLoggedIn();


      this.authServ.mini_games.subscribe(res => {
        this.allowedGame = res
      });
  
      // if (this.sockerServ.statusSC.mini_games) {
      //   this.route.navigate(['element-maintain']);
      // }
  
      if (!this.allowedGame && this.isSignedIn) {
        this.route.navigate(['/home']);
      }
      return true;
  }
  
}
