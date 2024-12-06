import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {  ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/services/gameService/game.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-jackpot',
  templateUrl: './jackpot.component.html',
  styleUrls: ['./jackpot.component.css']
})
export class JackpotComponent implements OnInit {
  games: any
  page: any = 0;
  listGame = [];
  // allGamesPages = 0;
  limitscrollPage = 1400;
  lim = 100
  totalIPages;
  name = new BehaviorSubject<string>('');
  castName;
  isLoggedIn: boolean;
  searchName : string;
  constructor(public modalService: NgbModal, private gameServ: GameService, private authServ: AuthService, private toastr: ToastrService, private translateService: TranslateService) {
    this.authServ.castSignedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  ngOnInit(): void {
    this.getCasinoGames()
  }
  getCasinoGames() {
    this.gameServ.getJackpot().subscribe((res: any) => {

      this.listGame = res.data

    })
  }
  openModal(game) {
    const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl', centered: true });
    modalRef.componentInstance.userid = localStorage.getItem('idUser');
    modalRef.componentInstance.game = game.id;
    modalRef.componentInstance.background = game.image;
    modalRef.componentInstance.name = game.menu_title;
    modalRef.componentInstance.gapi = game.gapi;
    modalRef.componentInstance.type = game.type;
    modalRef.result.then((result) => {
    }).catch((error) => {

    });
  }
  openToast() {
    this.toastr.info(this.translateF("You have to login before you play"), 'Info!', {
      timeOut: 7000,
    });
  }
  translateF(txt: string): string {
    return this.translateService.instant(txt);
  }
}
