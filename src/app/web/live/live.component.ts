import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  token: any
  link: any
  tokenInfo;
  selectedLng: any
  constructor(public translate: TranslateService) {
    this.selectedLng = this.translate.currentLang
    this.token = localStorage.getItem("accessToken")
    this.link = " https://sportnew.inplaynet.tech?token=" + this.token + "&c=carthago&brand=81&lang=" + this.selectedLng + "#/live"

  }

  ngOnInit(): void {
  }

}
