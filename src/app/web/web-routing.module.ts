import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { BlockedAmountGuard } from '../core/guard/blocked-amount.guard';
import { CasinoGuard } from '../core/guard/casino.guard';
import { LivecasinoGuard } from '../core/guard/livecasino.guard';
import { MaintenanceGuard } from '../core/guard/maintenance.guard';
import { MiniGamesGuard } from '../core/guard/mini-games.guard';
import { VirtualGuard } from '../core/guard/virtual.guard';
import { CasinoLiveComponent } from './casino-live/casino-live.component';
import { CasinoComponent } from './casino/casino.component';
import { EsportsComponent } from './esports/esports.component';
import { FiableGameComponent } from './fiable-game/fiable-game.component';
import { JackpotComponent } from './jackpot/jackpot.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { LiveComponent } from './live/live.component';
import { MiniGamesCComponent } from './mini-games-c/mini-games-c.component';
import { PlayComponent } from './play/play.component';
import { SportDigiComponent } from './sport-digi/sport-digi.component';
import { VirtualComponent } from './virtual/virtual.component';
import { XgameComponent } from './xgame/xgame.component';

const routes: Routes = [
  { path: 'casino-live', component: CasinoLiveComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard, LivecasinoGuard, AuthGuard] },
  { path: 'casino', component: CasinoComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard, CasinoGuard] },
  { path: 'virtual', component: VirtualComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard, VirtualGuard] },
  { path: 'jackpot', component: JackpotComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard] },
  { path: 'sport', component: SportDigiComponent, canActivate: [MaintenanceGuard] },
  { path: 'live', component: LiveComponent, canActivate: [MaintenanceGuard] },
  { path: 'live-score', component: LiveScoreComponent, canActivate: [MaintenanceGuard] },
  { path: 'esports', component: EsportsComponent, canActivate: [MaintenanceGuard] },
  { path: 'play', component: PlayComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard] },
  { path: 'mini-games-c', component: MiniGamesCComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard,  ] },
  { path: 'xgames', component: XgameComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard, MiniGamesGuard] },
  { path: 'squid-game', component: FiableGameComponent, canActivate: [MaintenanceGuard, BlockedAmountGuard, MiniGamesGuard] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WebRoutingModule { }
