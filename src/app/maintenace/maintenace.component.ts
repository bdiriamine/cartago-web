import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-maintenace',
  templateUrl: './maintenace.component.html',
  styleUrls: ['./maintenace.component.css']
})
export class MaintenaceComponent implements OnInit, OnDestroy {
  element: HTMLElement = document.getElementById('navbr');
  element2: HTMLElement = document.getElementById('ftr');
  element4: HTMLElement = document.getElementById('pages');
  // element5: HTMLElement = document.getElementById('pub');
  InMaintenance
  currentRoot


  constructor(private authServ: AuthService, private router: Router, private modalService: NgbModal,) {
    this.authServ.root.subscribe(res => {
      this.currentRoot = res
    })
  }
  ngOnInit(): void {
    this.authServ.logout()
    this.element.style.display = "none"
    this.element2.style.display = "none"
    this.element4.style.paddingTop = "0px"

    this.authServ.InMaintenance.subscribe(res => {
      this.InMaintenance = res

      // if (this.InMaintenance == true) {

      // } else {
      if (this.currentRoot == "/maintenance") {
        this.router.navigate(["/home"])
      }

    })

  }

  ngOnDestroy(): void {
    this.element.style.display = "block"
    this.element2.style.display = "block"
    this.element4.style.paddingTop = "60px"

  }


}
