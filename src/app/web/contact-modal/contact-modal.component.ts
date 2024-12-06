import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {


  elem: any; isFullScreen: boolean;



  constructor(private activeModal: NgbActiveModal) { }
  ngOnInit(): void {
  }




  closeModal() {
    this.activeModal.close('Modal Closed');
    (document.querySelector('html') as HTMLElement).style.overflow = 'auto';

  }


}
