import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guard/auth.guard';
import { CasinoHistoryComponent } from './casino-history/casino-history.component';
import { DrHistoryComponent } from './dr-history/dr-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MinigamestransactionComponent } from './minigamestransaction/minigamestransaction.component';
import { ParisHistoryComponent } from './paris-history/paris-history.component';

const routes: Routes = [
  { path: 'profile', component: EditProfileComponent },
  { path: 'betting-history', component: CasinoHistoryComponent },
  { path: 'mini-history', component: MinigamestransactionComponent },
  { path: 'dep-ret-history', component: DrHistoryComponent },
  { path: 'paris-history', component: ParisHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
