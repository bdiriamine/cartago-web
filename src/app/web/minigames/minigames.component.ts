import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocketServService } from 'src/app/core/services/socket-serv.service';
import { MinigamesService } from 'src/app/services/minigames.service';

@Component({
  selector: 'app-minigames',
  templateUrl: './minigames.component.html',
  styleUrls: ['./minigames.component.css']
})
export class MinigamesComponent implements OnInit {

  token: any;
  minigames = [];
  gamename: string;
  maint: boolean;
  constructor(
    private mini: MinigamesService,
    private toastrService: ToastrService,
    private translateService: TranslateService,
    private authServ: AuthService) {

  }
  ngOnInit() {
  

    this.authServ.tokenn.subscribe((res: any) => {
      if (res) {
        this.token = res
      }
    })
    if (!this.token) {

      this.token = localStorage.getItem("accessToken")

    }

  }

  openGame(gamename: string) {

    if (this.token) {
      this.mini.openMini(gamename)
    } else {

      this.toastrService.info(this.translateService.instant("You have to login before you play"), 'Info!', {
        timeOut: 7000,
      });

    }
  }
}
