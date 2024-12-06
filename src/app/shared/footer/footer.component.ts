import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContactModalComponent } from 'src/app/web/contact-modal/contact-modal.component';
import { ModalJackpotTermsComponent } from '../modal-jackpot-terms/modal-jackpot-terms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentRoot: string;
  constructor(
    private modalService: NgbModal,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.currentRoot = this.route.url
      }
    })
  }

  openModal() {
    const modal: NgbModalRef = this.modalService.open(ModalJackpotTermsComponent, { backdrop: "static" });
  }

  openModalContact() {
    const modalRef = this.modalService.open(ContactModalComponent, { size: 'lg', centered: true });
    modalRef.result.then((result) => {
    }).catch((error) => {
    });
  }
}
