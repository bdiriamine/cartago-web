import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GameService } from 'src/app/services/gameService/game.service';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  title = "Games"
  selectedItem = 'All games';
  games: any
  pagination: any
  notEmpty = true
  public loading = false;
  notScrolly = true
  page: any = 0;
  listGame = [];
  limitscrollPage = 1000;
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
  maint: boolean;
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

    this.authServ.casinoMaint.subscribe((res: boolean) => {
      this.maint = res;
      if(res){
        this.modalService.dismissAll();
      }
      
    })

    this.search = this.translateService.instant('Search');
    this.getProviders()
    this.getAllCategories()
    this.getCasinoGames(this.page, this.searchVal)



  }

  getValuee(e) {
    this.searchVal = e
  }
  searchClick() {
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 1000;
    this.haveName = true;
    this.end = false
    this.getCasinoGames(this.page, this.searchVal);

  }
  searchClickk(event) {
    if (event.keyCode === 13) {
      this.page = 0;
      this.listGame = [];
      this.limitscrollPage = 1000;
      this.haveName = true;
      this.end = false
      this.getCasinoGames(this.page, this.searchVal);

    }
  }

  end = false
  load = false
  getCasinoGames(page, name) {
    if (name == undefined) {
      name = ''
    }
    if (!this.end) {
      this.gameServ.getGames(page, name, this.provider, this.category).subscribe((res: any) => {

        this.pagination = res.data
        this.games = this.pagination.items
        this.tabLength = this.listGame.length

        if (this.games.length == 0) {
          this.load = false
        } else {
          this.load = true
        }


        this.games.forEach(element => {
          this.listGame.push(element)

        });

        if (this.page < this.pagination.totalPages - 1) {
          this.page += 1;
        } else {
          this.end = true
        }

      })
    }
  }




  onScroll(e) {

    if (e.currentScrollPosition >= this.limitscrollPage) {
      this.limitscrollPage += 1000;
      this.getCasinoGames(this.page, this.castName)
    }


  }


  openModal(game, name, background) {
    console.log(game)
    const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl', centered: true });
    modalRef.componentInstance.userid = localStorage.getItem('idUser');
    modalRef.componentInstance.casinoid = game.casino_id;
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.background = background;
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.type = game.type;

    modalRef.result.then((result) => {

    }).catch((error) => {

    });
  }

  getKeyValue(name) {
    this.name.next(name.target.value);
  }

  getProviders() {
    this.gameServ.getProvider(false).subscribe((res: any) => {
      this.providersList = res.data;
    })
  }



  getAllCategories() {
    this.gameServ.getAllCategories().subscribe((res: any) => {
      this.categories = res.data

    })
  }

  getproviderEvent(prov: string) {
    this.page = 0
    this.provider = prov
    this.listGame = [];
    this.limitscrollPage = 1000;
    this.end = false
    this.getCasinoGames(this.page, '')

  }
  getCategoryEvent(cat: string) {
    this.selectedItem = cat
    this.end = false
    this.category = cat
    this.page = 0
    this.listGame = [];
    this.limitscrollPage = 1000;
    this.getCasinoGames(this.page, '')
  }


  byAllCat() {
    this.category = ""
    this.selectedItem = "All games"
    this.page = 0
    this.listGame = [];
    this.limitscrollPage = 1000;
    this.getCasinoGames(this.page, '')
  }
  byAllProviders() {
    this.provider = ""
    this.page = 0
    this.listGame = [];
    this.limitscrollPage = 1000;
    this.getCasinoGames(this.page, '')
  }
  openToast() {
    this.toastr.info(this.translateF("You have to login before you play"), 'Info!', {
      timeOut: 7000,
    });
  }
  translateF(txt: string): string {
    return this.translateService.instant(txt);
  }
}