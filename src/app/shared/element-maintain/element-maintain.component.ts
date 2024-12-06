import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-element-maintain',
  templateUrl: './element-maintain.component.html',
  styleUrls: ['./element-maintain.component.css']
})
export class ElementMaintainComponent implements OnInit {
  @Input() page;
  constructor() { }

  ngOnInit(): void {
  }

}
