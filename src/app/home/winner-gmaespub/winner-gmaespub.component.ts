import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { JackpotWinnerService } from 'src/app/services/jackpot-winner/jackpot-winner.service';
import { GameModalComponent } from 'src/app/web/game-modal/game-modal.component';
import { Game } from '../models/game';

@Component({
  selector: 'app-winner-gmaespub',
  templateUrl: './winner-gmaespub.component.html',
  styleUrls: ['./winner-gmaespub.component.css']
})
export class WinnerGmaespubComponent implements OnInit {
  winnersList;
  userId;
  constructor(
    private jackpotWinnerServ: JackpotWinnerService,
    private modalService: NgbModal,
    private toasterSer: ToastrService,
    private authServ: AuthService) { }

  ngOnInit(): void {
    this.getWinners()
    
  }

  getWinners() {
    this.jackpotWinnerServ.getWinners().subscribe((res: any) => {
      if (res) {
        this.winnersList = res.data;
      }
    })
  }

  openGame(game: Game) {
    this.jackpotWinnerServ.isOpenned.next(true);
    if (localStorage.getItem('accessToken') != undefined) {
      const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl', centered: true });
      modalRef.componentInstance.game = game;
      modalRef.componentInstance.name = game.game_name;
      modalRef.componentInstance.type = 2;
      modalRef.componentInstance.userid = localStorage.getItem('idUser') ;
    } else {
      this.toasterSer.error('You should be logged in', 'Oops');
      this.jackpotWinnerServ.isOpenned.next(false);
    }
  }


}
