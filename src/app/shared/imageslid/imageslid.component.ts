import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imageslid',
  templateUrl: './imageslid.component.html',
  styleUrls: ['./imageslid.component.css']
})
export class ImageslidComponent implements OnInit {
  //--------------- Carousel de casino --------------------//
  slides = [
    {
      url: 'https://carthagobet.tn/assets/images/mini2.webp',
  
    }, {
      url: 'https://carthagobet.tn/assets/images/x-game.webp',
  
    },{
    url: 'https://carthagobet.tn/assets/images/b2.webp',

  },
    {
      url: 'https://carthagobet.tn/assets/images/b5.webp',
  
    },{
      url: 'https://carthagobet.tn/assets/images/CL2.webp',
  
    },
  ];



  constructor() {
  }

  ngOnInit() {
  }

}