import { Component, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from 'src/app/services/gameService/game.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { JackpotWinnerService } from 'src/app/services/jackpot-winner/jackpot-winner.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit, OnChanges {
  @Input() game: any;
  @Input() userid: any;
  @Input() casinoid: any;
  @Input() background: any;
  @Input() type: number;
  @Input() name: any;
  elem: any; isFullScreen: boolean;
  isBloqued: any
  iframeUrl;
  blocked
  constructor(@Inject(DOCUMENT) private document: any, private activeModal: NgbActiveModal, private gameServ: GameService, private authServ: AuthService, private router: Router, private _sanitizationService: DomSanitizer, private jackpotWinnerServ: JackpotWinnerService) { }
  ngOnChanges(changes: SimpleChanges): void {

  }
  fullscreen = false
  ngOnInit(): void {
    if (this.blocked === undefined) {
      this.blocked = this.authServ.isBlocked
    }
    this.authServ.blocked.subscribe((res: any) => {
      this.blocked = res
      if (this.blocked === true) {
        this.closeModal();
        this.router.navigateByUrl('/home');
        (document.querySelector('html') as HTMLElement).style.overflow = 'auto';

      }


    })
    if (this.blocked === true) {
      this.closeModal();
      this.router.navigateByUrl('/home');
      (document.querySelector('html') as HTMLElement).style.overflow = 'auto';

    }



    this.chkScreenMode();
    this.elem = document.documentElement;
    this.openGame();


  }

  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  fullscreenmodes(event) {
    this.chkScreenMode();
  }
  chkScreenMode() {
    if (document.fullscreenElement) {
      this.isFullScreen = true;
      (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
    } else {
      this.isFullScreen = false;
    }
  }
  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
  url = "https://carthagobet.tn/assets/images/logoc.webp";
  openGame() {

    if (this.type == 1) {
      this.gameServ.openGamegapi(this.userid, this.name).subscribe((res: any) => {
        this.url = res.data
        this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url);
        (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';

      })
    } else if (this.type == 2){
      this.gameServ.openGame(this.userid, this.game.identifier).subscribe((res: any) => {
        if (res) {
          this.url = res.data;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url);
          (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
        }
      })
    }else if (this.type == 4){
      this.gameServ.openSmartSoftGame(this.game.categoryWeb, this.game.name).subscribe((res: any) => {
                
        if (res) {
          this.url = res.data;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url);
          (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
        }
      })
    }
    else if (this.type ==6){
      console.log(this.casinoid)
      this.gameServ.getopenGameiq(this.casinoid).subscribe((res: any) => {
        console.log(res.data.ResponseObject)
        if (res) {
          this.url = res.data.ResponseObject;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url);
          (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
        }
      })
    }
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
    if (this.isFullScreen) {
      this.closeFullscreen();
    }
    (document.querySelector('html') as HTMLElement).style.overflow = 'auto';
    this.jackpotWinnerServ.isOpenned.next(false)
  }
  goHome() {
    this.closeModal();
    this.router.navigate(['home']);
  }
  clicFullscreen() {
    this.fullscreen = !this.fullscreen
  }
}
