import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/services/gameService/game.service';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { InplayModalComponent } from '../inplay-modal/inplay-modal.component';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {


  selectedItem = 'All Providers';
  games: any
  pagination: any
  notEmpty = true
  notScrolly = true
  page: any = 0;
  listGame = [];
  limitscrollPage = 1400;
  lim = 10
  totalIPages;
  name = new BehaviorSubject<string>('');
  castName;
  providersList;
  tabLength;
  haveName: boolean = false;
  categories
  category = ""
  provider = ""
  isLoggedIn = false
  search = "";
  selectedProvider = "All"
  searchVal = '';
  constructor(public modalService: NgbModal, private gameServ: GameService, private toastr: ToastrService, private authServ: AuthService, private translateService: TranslateService) {
    this.authServ.castSignedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })

  }

  ngOnInit(): void {
    this.search = this.translateService.instant('Search');
    this.getProviders()


    this.getCasinoGames(this.page)

  }





  getCasinoGames(page) {
    this.gameServ.getGamesVirtuel(page, this.provider).subscribe((res: any) => {
      this.pagination = res.data
      this.games = this.pagination.items
      this.tabLength = this.listGame.length
      this.games.forEach(element => {
        this.listGame.push(element)
      });
      this.page += 1;
    })
  }


  onScroll(e) {
    if (e.currentScrollPosition >= this.limitscrollPage) {
      this.limitscrollPage += 1000;
      this.getCasinoGames(this.page)
    }


  }

  openModal(game, name, background) {
    const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl', centered: true });
    modalRef.componentInstance.userid = localStorage.getItem('idUser');
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.background = background;
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.type = game.type;

    modalRef.result.then((result) => {

    }).catch((error) => {

    });
  }


  getProviders() {
    this.gameServ.getVirtualProvider().subscribe((res: any) => {
      this.providersList = res.data;
    })
  }




  getProvidersEvent(prov: string) {
    this.page = 0
    this.provider = prov
    this.listGame = [];
    this.limitscrollPage = 1400;
    this.getCasinoGames(this.page)
    this.selectedItem = prov;

  }



  byAllProviders() {
    this.provider = ""
    this.page = 0
    this.listGame = [];
    this.limitscrollPage = 1400;
    this.getCasinoGames(this.page)
    this.selectedItem = 'All Providers'
  }
  openToast() {
    this.toastr.info(this.translateF("You have to login before you play"), 'Info!', {
      timeOut: 7000,
    });
  }
  translateF(txt: string): string {
    return this.translateService.instant(txt);
  }
  inplay() {
    const modalRef = this.modalService.open(InplayModalComponent, { size: 'xxl', centered: true });

    modalRef.result.then((result) => {

    }).catch((error) => {

    });
  }
}
