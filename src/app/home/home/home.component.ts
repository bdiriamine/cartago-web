import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/services/gameService/game.service';
import { JackpotWinnerService } from 'src/app/services/jackpot-winner/jackpot-winner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loader = true;
  blocked
  isLoggedIn
  l

  topGames: any = [];
  topGames1: any = [];
  topGames2: any = [];

  game = false;
  gameShow = false;
  virtuel = false;
  jackpot = false;
  mini_games = false;
  sport = false;

  showJackpotWinner = true;
  constructor(
    private gameServ: GameService,
    public translate: TranslateService,
    private authServ: AuthService,
    private jackpotWinnerServ: JackpotWinnerService
  ) {

  }

  async ngOnInit() {

    this.authServ.updateParams();
    await this.authServ.game.subscribe(res => {
      this.game = res
    });
    await this.authServ.gameShow.subscribe(res => {
      this.gameShow = res
    });
    await this.authServ.virtuel.subscribe(res => {
      this.virtuel = res
    })
    await this.authServ.jackpot.subscribe(res => this.jackpot = res)
    await this.authServ.mini_games.subscribe(res => this.mini_games = res)
    await this.authServ.sport.subscribe(res => this.sport = res)

    this.blocked = this.authServ.isBlocked
    this.authServ.blocked.subscribe((res: any) => {
      this.blocked = res
    })

    this.authServ.castSignedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    this.jackpotWinnerServ.isOpenned.subscribe(res => {
      this.showJackpotWinner = !res;
    })

    this.getTopGames()
  }
  getTopGames() {
    this.gameServ.getTopGames().subscribe((res: any) => {
      this.topGames = res.data
      if (this.topGames.length % 2 == 0) {
        for (let i = 0; i <= Math.floor(this.topGames.length / 2); i++) {
          this.topGames1.push(this.topGames[i])
        }
        for (let j = Math.floor(this.topGames.length / 2) + 1; j <= this.topGames.length - 1; j++) {
          this.topGames2.push(this.topGames[j])
        }
      } else {
        for (let i = 0; i <= Math.floor(this.topGames.length / 2); i++) {
          this.topGames1.push(this.topGames[i])
        }

        for (let j = Math.floor(this.topGames.length / 2) + 1; j < this.topGames.length - 1; j++) {
          this.topGames2.push(this.topGames[j])
        }
      }
    })

  }

}
