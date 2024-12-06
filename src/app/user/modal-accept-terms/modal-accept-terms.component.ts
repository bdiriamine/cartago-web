import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-modal-accept-terms',
  templateUrl: './modal-accept-terms.component.html',
  styleUrls: ['./modal-accept-terms.component.css']
})
export class ModalAcceptTermsComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal, private authServ: AuthService) { }

  ngOnInit(): void {
  }
  dismissModal(msg) {
    this.authServ.acceptPolicy(this.username, false).subscribe(res => {
    })
    this.authServ.logout()

    this.activeModal.close(msg);

  }
  username = localStorage.getItem("username")
  accept(msg) {
    this.authServ.acceptPolicy(this.username, true).subscribe(res => {
    })
    this.activeModal.dismiss(msg);
    this.authServ.updateAcceptTerms()

  }
}
