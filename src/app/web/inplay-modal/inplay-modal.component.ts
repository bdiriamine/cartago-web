import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inplay-modal',
  templateUrl: './inplay-modal.component.html',
  styleUrls: ['./inplay-modal.component.css']
})
export class InplayModalComponent implements OnInit {
  @Input() game: any;
  @Input() userid: any;
  @Input() background: any;
  @Input() name: any;
  elem: any; isFullScreen: boolean;

  iframeUrl;
  token: string;

  constructor(@Inject(DOCUMENT) private document: any, private activeModal: NgbActiveModal, private router: Router, private _sanitizationService: DomSanitizer) { }
  fullscreen = false
  ngOnInit(): void {

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
      //fullscreen
      this.isFullScreen = true;
      (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
    } else {
      //not in full screen
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
  url
  openGame() {
    this.token = localStorage.getItem("accessToken");
    this.url = "https://sportnew.inplaynet.tech?token=" + this.token + "&c=carthago&brand=81#/virtual";

    this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url);
    (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';

  }





  closeModal() {
    this.activeModal.close('Modal Closed');
    this.closeFullscreen();
    (document.querySelector('html') as HTMLElement).style.overflow = 'auto';

  }
  goHome() {
    this.closeModal();
    this.router.navigate(['home']);
  }
  clicFullscreen() {
    this.fullscreen = !this.fullscreen
  }
}
