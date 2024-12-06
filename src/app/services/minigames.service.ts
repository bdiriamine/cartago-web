import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MinigamesService {
  url=environment.apiUrl+"mini_games"
  minigames = [
    {
      gameName: "Dino",
      gameLink: "https://games.upgaming.com/games/dino/?companyName=carthago&integration=public&Token=",

    },
    {
      gameName: "Chicken",
      gameLink: "https://games.upgaming.com/games/chicken/?companyName=carthago&integration=public&Token=",

    },
    {
      gameName: "Dice",
      gameLink: "https://games.upgaming.com/games/dice/?companyName=carthago&integration=public&Token=",

    },
    {
      gameName: "Hilo",
      gameLink: "https://games.upgaming.com/games/hilo/?companyName=carthago&integration=public&Token=",

    },
    {
      gameName: "Keno40",
      gameLink: "https://games.upgaming.com/games/keno40/?companyName=carthago&integration=public&Token=",

    }
  ];
  gamenameSub = new BehaviorSubject<string>('');
  gamenameObs: Observable<any>;
  constructor(private router: Router,private http: HttpClient) {

  }
  openMini(gameNameMini){
    this.gamenameSub.next(gameNameMini)
    this.gamenameObs = this.gamenameSub.asObservable().pipe(
      map((res) => {
        if (res == "")
          return null;
        let index = this.minigames.findIndex(game => game.gameName.toLocaleLowerCase() == res.toLocaleLowerCase());
        this.minigames[index].gameLink = this.minigames[index].gameLink;
        return this.minigames[index];
      }));
    this.gamenameObs.subscribe(res => {
      this.router.navigate(['/play']);
    });
   
  }
  
  getfbgames(){
    return this.http.get(this.url);
  }
  openGamefiable(urlGame) {
    return this.http.post(environment.apiUrl + 'game/open', {
      'game_url': urlGame,
      'type': 5,
      "device": "desktop"
    });
  }
  // getfbgames(){
  //   return this.http.get(this.url);
  // }
  // openGamefiable(urlGame) {
  //   return this.http.post(environment.apiUrl + 'game/open', {
  //     'game_url': urlGame,
  //     'type': 5,
  //     "device": "mobile"
  //   });
  // }
}
