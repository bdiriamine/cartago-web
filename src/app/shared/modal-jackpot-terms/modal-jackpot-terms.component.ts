import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from 'src/app/services/gameService/game.service';

@Component({
  selector: 'app-modal-jackpot-terms',
  templateUrl: './modal-jackpot-terms.component.html',
  styleUrls: ['./modal-jackpot-terms.component.css']
})
export class ModalJackpotTermsComponent implements OnInit {
  terms
  constructor(private activeModal: NgbActiveModal, private gameServ: GameService) { }

  ngOnInit(): void {
    this.termsAndCond()
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
    (document.querySelector('html') as HTMLElement).style.overflow = 'auto';

  }
  termsAndCond() {
    this.gameServ.termsAndCond().subscribe((res: any) => {
      this.terms = res.data
    })
  }
}
