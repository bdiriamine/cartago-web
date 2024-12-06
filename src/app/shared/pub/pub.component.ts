import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameService/game.service';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent implements OnInit {
  jackpots : Array <string>[] =[] ;
  winners: any
  constructor(private gameServe: GameService) { }

  ngOnInit(): void {
    this.getJackpots()
    this.getWinner()
    this.getjackpotaftermin()
  }
  getJackpots() {
      this.gameServe.getJackpotsWin().subscribe((res:any) => {
        this.jackpots[0]= res.data.lvl3_credits
        this.jackpots[1]=res.data.lvl4_credits
        this.jackpots[2]=res.data.lvl5_credits
      })
    
  }
  getjackpotaftermin() {
    setInterval(() => {
      this.gameServe.getJackpotsWin().subscribe((res:any) => {
        this.jackpots[0]= res.data.lvl3_credits
        this.jackpots[1]=res.data.lvl4_credits
        this.jackpots[2]=res.data.lvl5_credits
    
      })
    }, 30000 );
  }
  winner: string = ""
  winnerr: string = ""
  getWinner() {
    this.gameServe.getWinner().subscribe((res: any) => {
      if (res.data)
        this.winners = res.data
      this.winners.forEach(element => {
        this.winner = this.winner + element.user.username + ", "
      });
      this.winnerr = this.winner.substring(0, this.winner.length - 2);

    })
  }

}
