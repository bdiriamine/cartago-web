import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/gameService/game.service';

@Component({
  selector: 'app-pub-message',
  templateUrl: './pub-message.component.html',
  styleUrls: ['./pub-message.component.css']
})
export class PubMessageComponent implements OnInit {
  jackpots
  winners: any
  constructor(private gameServe: GameService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
