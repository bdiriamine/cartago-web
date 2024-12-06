import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-xgame',
  templateUrl: './xgame.component.html',
  styleUrls: ['./xgame.component.css']
})
export class XgameComponent implements OnInit {
  token: any
  constructor(     private toastrServ: ToastrService,private authServ: AuthService,) {
    this.authServ.tokenn.subscribe((res: any) => {

      if (res) {
        this.token = res
      }
    })
    if (!this.token) {

      this.token = localStorage.getItem("accessToken")

    }


   }

  ngOnInit(): void {
  }
  openNewGame(gameName: string, category: string) {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = "https://server.ssg-public.com/GameLauncher/Loader.aspx?GameCategory=" + category + "&GameName=" + gameName + "&Token=" + this.token + "&PortalName=inbet&lang=en&returnUrl=https://carthagobet.tn/#/mini-games-c";
    }
  }
}
