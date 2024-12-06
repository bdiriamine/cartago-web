import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { Maintain } from '../models/Maintain';

@Injectable({
  providedIn: 'root'
})
export class SocketServService {

 
  statusSC : Maintain;
  statuSite = new Subject();

  private solde = new BehaviorSubject<boolean>(false);
  soldeSC = this.solde.asObservable();

  sold: any
  bolqService: any
  socket: io.Socket;
  SOC_URL = environment.socket;

  myOBStatus = Observable.create((observer: Observer<any>) => {
    this.socket.on('status', function (data: Maintain) {
      observer.next(data)
      this.statuSite = data.site
    });
  })



  myOBSolde = Observable.create((observer: Observer<any>) => {
    this.socket.on('balance', function (data: any) {
      observer.next(data)
      this.score = data.balance
      this.cashback = data.cashback
      this.bloque = data.blocked
    });
  })
  newMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('NewMessage', function (data: any) {
      this.listMessages.push(data);
      observer.next(this.listMessages)
    });
  })
  sendMessage = new Observable((observer: Observer<any>) => {

    this.socket.on('SendMessage', function (data: any) {
      this.getMessage.subscribe((d) => {
        this.listMessages = d;
      })
      observer.next(data)
    });

  })
  getMessage = new Observable((observer: Observer<any>) => {
    this.socket.on('messages', function (data: any) {
      this.listMessages = data;
      observer.next(data)
    });
  })
  listMessages = [];
  constructor(private authServ: AuthService) { }
  connect() {
    this.socket = io.connect(this.SOC_URL, { 'forceNew': true });
  }
  getBalance(fp, idUser) {
    this.socket.emit('Getbalance', { 'id': idUser, 'finger_print': fp });
    this.myOBSolde.subscribe((data: any) => {
      this.sold = data.balance
      this.soldeSC = data

    });
  }
  getStatus() {
    this.socket.emit('status', { 'id': 'status' });
    this.myOBStatus.subscribe((data: Maintain) => {
      this.statuSite.next(data.site);
      this.authServ.sportMaint.next(data.sport);
      this.authServ.casinoMaint.next(data.casino);
      this.authServ.miniGamesMaint.next(data.mini_games);

      this.authServ.sportMaint.next(data.sport);
    });
  }
  getMesgs(idUser, fp) {
    this.socket.emit('GetMessages', { 'id': idUser, 'finger_print': fp });
  }
  sendMessageSoc(idUser, message, username) {
    this.socket.emit('SendMessage', { 'id': idUser, 'message': message, 'username': username });
  }
  disconnect() {
    return this.socket.disconnect()

  }
}
