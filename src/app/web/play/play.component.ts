import { Component, OnInit } from '@angular/core';
import { MinigamesService } from 'src/app/services/minigames.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  gamename: any;
  token: string;
  gameLink: string;
  constructor(private mini: MinigamesService, private _sanitizationService: DomSanitizer, private router: Router) {
    this.token = localStorage.getItem("accessToken");
  }
  url
  iframeUrl
  ngOnInit() {

    this.mini.gamenameObs.subscribe(res => {
      if (res != null) {
        this.url = res.gameLink
        this.gamename = this._sanitizationService.bypassSecurityTrustResourceUrl(this.url + this.token);

      }
      else {
        // this.router.navigate(['/home']);
      }

    })
  }




}


