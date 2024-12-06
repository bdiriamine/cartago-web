import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-jackpotwinner',
  templateUrl: './jackpotwinner.component.html',
  styleUrls: ['./jackpotwinner.component.css']
})
export class JackpotwinnerComponent implements OnInit {
  @Input() id: any;
  @Input() amount: any;
  constructor(
    private activeModal: NgbActiveModal,
     private authServ: AuthService) { }

  ngOnInit(): void {
  }

  close() {
    //    this.authServ.jackpotWinnerShower(this.id).subscribe((res: any) => {
    this.activeModal.close();
    //   })

  }

}
