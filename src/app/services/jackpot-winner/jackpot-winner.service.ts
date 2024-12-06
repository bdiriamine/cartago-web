import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/app/home/models/game';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JackpotWinnerService {
  isOpenned = new BehaviorSubject<Boolean>(false);
  constructor(private httpClient: HttpClient) { }

  openJackpotWinnerGame(game: Game){
    return this.httpClient.post(environment.apiUrl + 'game/open', {
      'user_id': game.identifier ,
      'game': game.game_name,
      'type': 2,
      "client_type": "desktop"
    });
  }

  getWinners(){
    return this.httpClient.get(environment.apiUrl + 'top_winners');
  }
}
