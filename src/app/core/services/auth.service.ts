import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ModalAcceptTermsComponent } from '../../user/modal-accept-terms/modal-accept-terms.component';
import jwt_decode from "jwt-decode";
import * as CryptoJS from 'crypto-js';
import { JackpotwinnerComponent } from 'src/app/user/jackpotwinner/jackpotwinner.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  miniGamesMaint = new Subject();
  casinoMaint = new Subject();
  sportMaint = new Subject();
  innerWidth: number;
  secretKey = '11eb-b8bc-0242ac130003';
  configList: string;
  game = new BehaviorSubject<boolean>(true);
  gameShow = new BehaviorSubject<boolean>(true);
  virtuel = new BehaviorSubject<boolean>(false);
  jackpot = new BehaviorSubject<boolean>(false);
  mini_games = new BehaviorSubject<boolean>(true);
  sport = new BehaviorSubject<boolean>(true);
  authToken!: any;
  loggedIn = false;
  token;
  user = new Subject<object>()
  castId = new Subject();
  blocked = new Subject();
  root = new Subject();
  fp = new Subject();
  isBlocked
  private signedIn = new BehaviorSubject<boolean>(false);
  castSignedIn = this.signedIn.asObservable();
  InMaintenance = new Subject()
  config_webs = new Subject()
  maint
  tokenn = new Subject()

  maintenacee = new Subject<boolean>();
  castMaintenace = this.maintenacee.asObservable();

  private bal = new BehaviorSubject<number>(0);
  castBal = this.bal.asObservable();
  hasUploadedId: boolean;

  ipAddress: string;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private modalService: NgbModal, private modalServicee: NgbModal, private toastrService: ToastrService, private translateService: TranslateService) {
  }

  sportToken() {
    return this.http.post("https://sportbet.carthagobet.tn/api/createPlayer", {})
  }

  iqQportToken() {
    return this.http.post("https://iqsoft.carthagobet.tn/api/game/open", {
      "game_id": 6,
      "client_type": "desktop",
      "token": localStorage.getItem('accessToken')
    })
  }

  showerror(message) {
    this.toastr.error(this.translate(message), this.translate('Error'), {
      timeOut: 7000,
    });
  }

  showeSuccess(message) {
    this.toastr.success(this.translate(message), this.translate('Success'), {
      timeOut: 7000,
    });
  }
  closeModall() {
    this.modall.close()
  }

  closeModal() {
    this.modal.close()
  }
  showeInfo() {


    this.toastr.info("", 'Info!', {
      timeOut: 7000,
    });
  }

  success = "User connected successfully"


  modall: NgbModalRef
  modal: NgbModalRef
  modalJackpot: NgbModalRef
  login(username: any, password: any) {
    //this.http.get("https://api64.ipify.org/?format=text", { responseType: 'text' }).toPromise().then((data: any) => {
      this.ipAddress = "197.27.118.167"

      this.http.post(environment.apiUrl + 'auth/signin', { username: username, password: password, ip_adress: this.ipAddress }).subscribe((res: any) => {
        if (res) {
          this.hasUploadedId = res.has_uploaded_id;
          this.signedIn.next(true);
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('idUser', res.id);
          localStorage.setItem('username', res.username);
          this.tokenn.next(localStorage.getItem('accessToken'))
          localStorage.setItem('config_web', res.config_webs)
          this.config_webs.next(res.config_webs)
          this.castId.next(res.id);

          if (res.showTerms == true) {
            this.modall = this.modalService.open(ModalAcceptTermsComponent, { backdrop: "static" });
          } else {
            this.showeSuccess('User connected successfully!')

            this.router.navigate(['/casino']);

            this.http.get(environment.apiUrl + 'user/' + localStorage.getItem("idUser")).subscribe((resp: any) => {
              this.user.next(resp.data)
            })
          }
        }
        if (res.showWinner == true) {
          this.modalJackpot = this.modalService.open(JackpotwinnerComponent, { backdrop: "static" })
          this.modalJackpot.componentInstance.id = res.jackpotData.id;
          this.modalJackpot.componentInstance.amount = res.jackpotData.amount;

          this.modalJackpot.result.then((result) => {

          }).catch((error) => {

          });
        }

      }
        , ((err: any) => {
          this.showerror(err.error.message)
        })
      )
 // })
  }

  updateParams() {
    if (this.isSignedIn() == false) {
      this.config_webs.subscribe(w => {
        this.configList = this.decryptData(w);
        for (let i = 0; i <= this.configList.length; i++) {
          this.configList = this.configList.replace('"', '')
        }
        const item = this.configList.trim().split(',').slice(0, -1)
        if (item.length > 0) {
          item.forEach(elem => {
            if (elem == '010') this.game.next(true);
            if (elem == '020') this.gameShow.next(true);
            if (elem == '030') this.virtuel.next(true);
            if (elem == '040') this.jackpot.next(true);
            if (elem == '050') this.mini_games.next(true);
            if (elem == '060') this.sport.next(true);
          })
        }
      });
    } else {
      this.configList = this.decryptData(localStorage.getItem('config_web'));
      for (let i = 0; i <= this.configList.length; i++) {
        this.configList = this.configList.replace('"', '')
      }
      const item = this.configList.trim().split(',').slice(0, -1)

      if (item.length > 0) {
        item.forEach(elem => {
          if (elem == '010') { this.game.next(true); }
          if (elem == '020') this.gameShow.next(true);
          if (elem == '030') this.virtuel.next(true);
          if (elem == '040') this.jackpot.next(true);
          if (elem == '050') this.mini_games.next(true);
          if (elem == '060') this.sport.next(true);
        })
      }
    }
  }


  decryptData(data) {
    return CryptoJS.AES.decrypt(data, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }






  updateAcceptTerms() {
    this.showeSuccess('User connected successfully!')
    this.http.get(environment.apiUrl + 'user/' + localStorage.getItem("idUser")).subscribe((resp: any) => {
      this.user.next(resp.data)
    })
    this.router.navigate(['/home']);

  }


  isLoggedIn() {
    if (localStorage.getItem('accessToken') != null) {
      this.signedIn.next(true)
      return this.loggedIn = true;

    } else {
      this.signedIn.next(false)
      return this.loggedIn = false;

    }
  }
  isLoggedInn(loggedIn) {
    if (localStorage.getItem('accessToken') != null) {
      this.signedIn.next(true)
      return loggedIn = true;

    } else {
      this.signedIn.next(false)
      return loggedIn = false;

    }
  }

  isSignedIn() {
    this.token = localStorage.getItem('accessToken')
    return this.token ? true : false;
  }

  getToken() {
    this.authToken = localStorage.getItem('accessToken');
    return this.authToken;
  }

  logout() {
    this.signedIn.next(false);
    this.authToken = null;
    this.modalService.dismissAll()
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
  }

  signup(username, firstname, lastname, email, password, phone, country, cin, terms) {
    this.http.post(environment.apiUrl + 'auth/signup', { username, firstname, lastname, email, password, phone, country, cin, terms }).subscribe(
      (res: any) => {
        if (res) {
          this.toastrService.success(res.message + ' try to login on later ', 'Success');
          // this.close()
        }
      },
      (err: any) => {
        this.toastrService.error(this.translate(err.error.message), 'Error');
      }
    )
  }

  baseUrl = ""
  upload(images: any): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', `${environment.apiUrl}users/verif_id`, { images }, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }


  private translate(txt: string): string {
    return this.translateService.instant(txt);
  }

  acceptPolicy(username, accepted) {
    return this.http.post(environment.apiUrl + 'accept_decline_terms?username=' + username + "&accepted=" + accepted, {})

  }
  maintenance() {
    return this.http.get(environment.apiUrl + "maintenance_mode")
  }

  jackpotWinnerShower(id) {
    return this.http.put(environment.apiUrl + "users/closeModal?jackpot_id=" + id, "")
  }



  getTokenExpirationDate(token: string): Date {
    token = this.getToken()
    var decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  logOut(loginType?: string) {
    this.signedIn.next(false);
    this.authToken = null;
    this.modalService.dismissAll()
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
  }
  sportDIGI(iframesize:number) {
    let username = localStorage.getItem("username")
    console.log(this.ipAddress)
    return this.http.post(environment.apiUrl + '/auth/refresh', { username: username, ip: this.ipAddress, IsMobile : iframesize })
  }
  getip() {
    this.http.get("https://api.ipify.org/?format=text", { responseType: 'text' }).toPromise().then((data: any) => {
      this.ipAddress = data
    })
  }
}
