import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment.prod';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { SocketServService } from 'src/app/core/services/socket-serv.service';
import FingerprintJS from '@fingerprintjs/fingerprintjs'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollme') private myScrollContainer: ElementRef;

  socket: io.Socket;

  idUser: any;
  mlength: any;
  scrollto: any;
  username;
  message: string;
  listMessages: any;
  visitorId: string;

  constructor(
    private authServ: AuthService, private router: Router, private socketServ: SocketServService
  ) {
    const fpPromise = FingerprintJS.load()
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        // This is the visitor identifier:
        this.visitorId = result.visitorId
        this.authServ.fp.next(this.visitorId)
        if (this.idUser) {
          this.socketServ.getMesgs(this.idUser, this.visitorId)
          this.socketServ.getMessage.subscribe((data) => {
            this.listMessages = data;
            setTimeout(() => {
              this.scrollToBottom();
            }, 800)
          }, (error) => {
          }, () => {
          })
        }
      })
    this.authServ.castId.subscribe((res: any) => {
      this.idUser = res;
    });
  }

  ngOnInit() {
    this.scrollToBottom();
    this.idUser = localStorage.getItem('idUser');
    if (this.idUser) {
      this.socketServ.sendMessage.subscribe((msg: any) => {
        this.listMessages = msg;
      })

      this.socketServ.newMessage.subscribe((data) => {
        this.listMessages = data;
      })
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  connect() {
    if (this.idUser == undefined) {
      this.idUser = localStorage.getItem('idUser');
      this.username = localStorage.getItem('name');
    }
  }

  // goDown() {
  //   this.scrollto !== null && this.scrollto !== undefined &&
  //     document.getElementById(this.scrollto).scrollIntoView({
  //       behavior: 'smooth'
  //     });
  // }

  send(message) {
    this.message = message;
    if (message != undefined && message != '') {
      this.socketServ.sendMessageSoc(this.idUser, message, this.username);
      this.mlength = this.listMessages.length - 1;
      // this.scrollto = this.listMessages[this.mlength].id


      this.message = ""

      setTimeout(() => {
        this.scrollToBottom();
      }, 1000)
    }
  }
}