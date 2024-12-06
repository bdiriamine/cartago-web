import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';
import { UserService } from 'src/app/services/userService/user.service';
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-minigamestransaction',
  templateUrl: './minigamestransaction.component.html',
  styleUrls: ['./minigamestransaction.component.css']
})
export class MinigamestransactionComponent implements OnInit {
  closeResult = '';
  idUser
  transaction: any
  pageSize;


  BOL: boolean = false;
  transactions: any;
  zindex = 1;
  UserPlayer: any;
  lengthdata: number;
  page = 0
  myOB = Observable.create((observer: Observer<any>) => { observer.next(this.getdTicketsPlayer()) })
  constructor(private userServ: UserService, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    this.idUser = localStorage.getItem("idUser")
    this.getdTicketsPlayer()
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.modalService.dismissAll();
    });
  }
  totalPages


  getdTicketsPlayer() {

    this.userServ.getTransactionMini(this.idUser).subscribe((res: any) => {
      this.lengthdata = res.data.items.length;
      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;
        this.totalPages = res.data.totalPages
        this.arraytotal = this.counter(this.totalPages)
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });


      } else {
        this.BOL = false;
      }
    })
  }
  getdTicketsPlayerPage(page) {

    this.page = page;
    this.userServ.getTransictionsByPageMini(this.idUser, page).subscribe((res: any) => {
      this.lengthdata = res.data.items.length;
      if (res) {

        this.BOL = true;
        this.transactions = res.data.items;
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });


      } else {
        this.BOL = false;
      }
    })
  }
  backTo() {
    this.zindex = this.zindex - 1
    this.page = this.page - 1

    if (this.page < 0) {
      this.zindex = 0
      this.page = 0

    }

    this.userServ.getTransictionsByPageMini(this.idUser, this.page).subscribe((res: any) => {

      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;

        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });


      } else {
        this.BOL = false;
      }
    })
  }
  arraytotal = []
  counter(totalPages: number) {
    return new Array(totalPages);
  }

  nextTo() {

    if (this.page < this.totalPages - 1) {

      this.zindex = this.zindex + 1
      this.page = this.page + 1
    }
    this.userServ.getTransictionsByPageMini(this.idUser, this.page).subscribe((res: any) => {
      if (res) {
        this.BOL = true;
        this.transactions = res.data.items;
        this.transactions.forEach(element => {
          element.createdAt = new Date(element.createdAt)
        });


      } else {
        this.BOL = false;
      }
    })
  }

}
