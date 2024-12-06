import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Observer, Subject, pipe } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from 'src/app/web/login/login.component';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/services/userService/user.service';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RegisterComponent } from '../register/register.component';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { FileModalComponent } from 'src/app/web/file-modal/file-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { SocketServService } from 'src/app/core/services/socket-serv.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any
  public isCollapsed = true;
  selectedItem;
  settings = false;
  loggedIn !: boolean;
  isLoggedIn = false;
  socket: io.Socket;
  token = localStorage.getItem("accessToken");
  SOC_URL = environment.socket;
  balance: any;
  cashback: any
  visitorId;
  bloque = false
  selectedLng = "";
  hasConverted
  inMaintenance: any
  codes: any
  game = true;
  gameShow = false;
  virtuel = false;
  jackpot = false;
  mini_games = true;
  sport = true;


  private bal = new BehaviorSubject<number>(-1);
  castBal = this.bal.asObservable();


  // myOB = Observable.create((observer: Observer<any>) => {
  //   this.socket.on('balance', function (data: any) {

  //     observer.next(data)
  //     this.score = data.balance
  //     this.cashback = data.cashback
  //     this.bloque = data.blocked
  //   });
  // })
  firstname: string;
  currentRoot: any;
  idUser: any;
  loginForm !: FormGroup
  showPassword = false;
  constructor(
    private http: HttpClient,
    private route: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private transServ: TranslationService,
    private authServ: AuthService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private toastrSer: ToastrService,
    private socketServ: SocketServService,

) {

    this.authServ.isLoggedIn();
    this.authServ.user.subscribe((userr: any) => {
      this.firstname = userr.username
      localStorage.setItem("name", this.firstname)

    })
    if (!this.firstname) {
      this.firstname = localStorage.getItem("name")
    }

    this.authServ.castSignedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  code
  async ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })

    await this.authServ.updateParams();
    await this.authServ.game.subscribe(res => this.game = res);
    await this.authServ.gameShow.subscribe(res => this.gameShow = res);
    await this.authServ.virtuel.subscribe(res => this.virtuel = res)
    await this.authServ.jackpot.subscribe(res => this.jackpot = res)
    await this.authServ.mini_games.subscribe(res => this.mini_games = res)
    await this.authServ.sport.subscribe(res => this.sport = res)

    this.selectedLng = this.translate.currentLang
    this.authServ.castId.subscribe((res: any) => {
      this.idUser = res;
      if (this.isLoggedIn == true) {
        // const fpPromise = FingerprintJS.load()
        // fpPromise
        //   .then(fp => fp.get())
        //   .then(result => {
        //     // This is the visitor identifier:
        //     this.visitorId = result.visitorId

        this.authServ.fp.subscribe(res => {
          this.visitorId = res


          this.socketServ.getBalance(this.visitorId, this.idUser)
          this.socketServ.myOBSolde.subscribe((data) => {

            if (data.balance !== 'NaN') {
              this.balance = data.balance;
              this.bloque = data.blocked
              this.authServ.isBlocked = this.bloque
              this.authServ.blocked.next(this.bloque)
            } else {

              this.balance = "0"

            } this.cashback = data.cashback
            this.hasConverted = data.has_converted

            if (data.balance == -1) {
              this.logout();
              this.toastrSer.warning('You are already logged in on another device', 'Warning');
              this.route.navigate(['/home']);
              localStorage.clear()
            }

          }, (error) => {
          }, () => {
          })
        })
      }
    })


    if (this.idUser == null) {
      this.idUser = localStorage.getItem('idUser');

      if (this.isLoggedIn == true) {
        // const fpPromise = FingerprintJS.load()
        // fpPromise
        //   .then(fp => fp.get())
        //   .then(result => {
        //     // This is the visitor identifier:
        //     this.visitorId = result.visitorId

        this.authServ.fp.subscribe(res => {
          this.visitorId = res


          this.socketServ.getBalance(this.visitorId, this.idUser)
          this.socketServ.myOBSolde.subscribe((data) => {

            this.bloque = data.blocked
            this.authServ.blocked.next(this.bloque)
            this.authServ.isBlocked = this.bloque
            if (data.balance !== 'NaN') {
              this.balance = data.balance;
            } else {

              this.balance = "0"
            }
            this.cashback = data.cashback
            this.hasConverted = data.has_converted

            if (data.balance == -1) {
              this.logout();
              this.toastrSer.warning('You are already logged in on another device', 'Warning');
              this.route.navigate(['/']);
            }
          }, (error) => {
          }, () => {
          })
        })
      }
    }




    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentRoot = this.route.url
      }
    })
    this.selectedItem = this.currentRoot






  }

  translateF(txt: string): string {
    return this.translate.instant(txt);
  }
  onClickedOutside(e: any) {
    if ((e.screenX > 300) && (e.screenY > 300)) {
      this.isCollapsed = false;
      this.settings = false;
    }
  }
  showeInfo() {
    this.toastr.info(this.translateF("This account is already connected to another device"), 'Info!', {
      timeOut: 7000,
    });
  }
  // connect(fp) {
  //   this.socket = io.connect(this.SOC_URL, { 'forceNew': true });
  //   // if (this.isLoggedIn == true) {
  //   // setInterval(() => {
  //   this.socket.emit('Getbalance', { 'id': this.idUser, 'finger_print': fp });
  //   // }, 5000)

  // }
  // disconnect() {
  //   return this.socket.disconnect()

  // }

  openModal() {
    const modal: NgbModalRef = this.modalService.open(LoginComponent, { backdrop: "static" });
  }
  openModalRegister() {
    const modal: NgbModalRef = this.modalService.open(RegisterComponent, { backdrop: "static" });
  }
  openModalfiles() {
    const modal: NgbModalRef = this.modalService.open(FileModalComponent, { backdrop: "static" });
  }

  selectedNav(item: string) {
    this.selectedItem = item;
  }

  showSetting() {
    this.settings = !this.settings;
  }
  logout() {
    // this.socketServ.disconnect()
    // localStorage.clear()
    this.authServ.logout();
    this.settings = false;
    window.location.reload();
    this.route.navigate(["/"])
  }

  switchLang(lang: string) {
    this.translate.use(lang);

  }
  convertCashback() {
    this.userService.convertCashback().subscribe(res => {
    })
  }
  login() {
 
      this.authServ.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);

    
  }

}