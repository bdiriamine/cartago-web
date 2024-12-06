import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  showNavigationIndicators = false;

  constructor(config: NgbCarouselConfig) {
    config.showNavigationIndicators = true;
  }

  ngOnInit(): void {
  }

}
