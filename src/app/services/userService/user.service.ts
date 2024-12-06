import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getProfile(id) {
    return this.httpClient.get(environment.apiUrl + 'user/' + id)
  }
  updateProfile(id, user) {
    return this.httpClient.put(environment.apiUrl + 'user/' + id, user)
  }
  changePassword(id, object) {
    return this.httpClient.put(environment.apiUrl + 'user/change_password/' + id, object);
  }
  drhistory(username) {
    return this.httpClient.get(environment.apiUrl + 'depot_retrait?username=' + username);
  }
  getTransaction(id) {
    return this.httpClient.get(environment.apiUrl + 'transactions?player_id=' + id);
  }
  getParisHistory(id) {
    return this.httpClient.get(environment.apiUrl + 'tickets?player_id=' + id);
  }
  getParisHistoryByPage(id, page) {
    return this.httpClient.get(environment.apiUrl + 'tickets?player_id=' + id + '&page=' + page);
  }
  getTransictionsByPage(id, page) {
    return this.httpClient.get(environment.apiUrl + 'transactions?player_id=' + id + '&page=' + page);
  }
  getTransactionMini(id) {
    return this.httpClient.get(environment.apiUrl + 'mini_transactions?player_id=' + id);
  }
  getTransictionsByPageMini(id, page) {
    return this.httpClient.get(environment.apiUrl + 'mini_transactions?player_id=' + id + '&page=' + page);
  }
  convertCashback() {
    return this.httpClient.post(environment.apiUrl + "cashback", {});

  }



}
