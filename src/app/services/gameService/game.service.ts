import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  url: string;
 
  constructor(private httpClient: HttpClient) { }

  getGames(page, name, provider, category) {

    if (name || provider || category) {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&name=' + name + '&provider=' + provider + '&category=' + category + '&size=' + 50 + "&live=0");
    } else {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&size=' + 50 + "&live=0");
    }

  }

  getGamesLiveCasino(page, name, provider, category) {

    if (name || provider || category) {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&name=' + name + '&provider=' + provider + '&category=' + category + '&size=' + 50 + "&live=1");
    } else {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&size=' + 50 + "&live=1");
    }

  }
  getopenGameiq(game_id ) {
   let  tk = localStorage.getItem("accessToken")
   let idConToint= Number(game_id)
    return this.httpClient.post('https://apihost.carthagobet.tn/api/game/open', {
      'game_id': idConToint,
      'client_type': "desktop",
      'token': tk,
      "website": "carthago"
    });

  }
  getGamesVirtuel(page, provider) {

    if (provider) {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&provider=' + provider + '&size=' + 50 + "&virtual=true");
    } else {
      return this.httpClient.get(environment.apiUrl + 'games?page=' + page + '&size=' + 50 + "&virtual=true");
    }

  }
  getProvider(isLive) {
    return this.httpClient.get(environment.apiUrl + 'game/providers?live=' + isLive);
  }
  openGame(id, game) {
    return this.httpClient.post(environment.apiUrl + 'game/open', {
      'user_id': id,
      'game': game,
      'type': 2,
      "client_type": "desktop"
    });
  }

  openGamegapi(id, title) {
    return this.httpClient.post(environment.apiUrl + 'game/open',
      {
        login: id,
        game: title,
        type: 1
      });
  }

  openSmartSoftGame(category, game) {
    return this.httpClient.post(environment.apiUrl + 'game/open', {
      "type": 4,
      "game": game,
      "category": category
    });
  }

  getAllCategories() {
    return this.httpClient.get(environment.apiUrl + 'game/categorys');
  }
  getTopGames() {
    return this.httpClient.get(environment.apiUrl + 'top_games');

  }
  getJackpot() {
    return this.httpClient.get(environment.apiUrl + 'jackpot_games?page=' + 1 + '&limit=' + 10);

  }
  termsAndCond() {
    return this.httpClient.get(environment.apiUrl + 'terms');
  }
  getJackpotsWin() {
    return this.httpClient.get("https://admin.gapi.lol/api/get/global/jackpot?api_id=mo9TroBDUKFqkrPvfu2zRGx5JuOJf1Ae&api_key=gHoYN4LEomGO5IZdcBFfqj71ugWnjy4R&hash=0005a270-7fd0-45ca-a6c8-0b754028d565");

  }
  getWinner() {
    return this.httpClient.get(environment.apiUrl + 'jackpot_winners');

  }
  getVirtualProvider() {
    return this.httpClient.get(environment.apiUrl + "virtual/providers")
  }
}