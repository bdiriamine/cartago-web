import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css']
})
export class LiveScoreComponent implements OnInit {
  currentURL: string;
  element2: any;

  constructor() { }

  ngOnInit(): void {
    this.element2 = document.getElementById('ftr')
    this.element2.style.display = "none"

  }
  ngOnDestroy() {
    this.element2.style.display = "block"
  }
}
