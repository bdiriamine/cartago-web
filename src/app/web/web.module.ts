import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SliderComponent } from './slider/slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CasinoLiveComponent } from './casino-live/casino-live.component';
import { RouterModule } from '@angular/router';
import { DragScrollModule } from 'ngx-drag-scroll';
import { CasinoComponent } from './casino/casino.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { VirtualComponent } from './virtual/virtual.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GameModalComponent } from './game-modal/game-modal.component';
import { JackpotComponent } from './jackpot/jackpot.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { WebComponent } from './web/web.component';
import { LiveComponent } from './live/live.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { FileModalComponent } from './file-modal/file-modal.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { SafePipe } from '../core/safe.pipe';
import { EsportsComponent } from './esports/esports.component';
import { MinigamesComponent } from './minigames/minigames.component';
import { PlayComponent } from './play/play.component';
import { MiniGamesCComponent } from './mini-games-c/mini-games-c.component';
import { InplayModalComponent } from './inplay-modal/inplay-modal.component';
import { SportDigiComponent } from './sport-digi/sport-digi.component';
import { XgameComponent } from './xgame/xgame.component';
import { FiableGameComponent } from './fiable-game/fiable-game.component';
import { SearchFilterPipe } from './pipeLines/search-filter.pipe';



@NgModule({
  declarations: [
    LoginComponent,
    SliderComponent,
    CasinoLiveComponent,
    CasinoComponent,
    VirtualComponent,
    GameModalComponent,
    JackpotComponent,
    ContactModalComponent,
    LiveComponent,
    WebComponent,
    LiveScoreComponent,
    FileModalComponent,
    SafePipe,
    EsportsComponent,
    MinigamesComponent,
    PlayComponent,
    MiniGamesCComponent,
    InplayModalComponent,
    SportDigiComponent,
    XgameComponent,
    FiableGameComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    DragScrollModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    NgSelectModule
  ],
  exports: []
})
export class WebModule { }
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
