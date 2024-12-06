import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CasinoHistoryComponent } from './casino-history/casino-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';
import { DrHistoryComponent } from './dr-history/dr-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { ModalAcceptTermsComponent } from './modal-accept-terms/modal-accept-terms.component';
import { ParisHistoryComponent } from './paris-history/paris-history.component';
import { JackpotwinnerComponent } from './jackpotwinner/jackpotwinner.component';
import { MinigamestransactionComponent } from './minigamestransaction/minigamestransaction.component';


@NgModule({
  declarations: [
    EditProfileComponent,
    CasinoHistoryComponent,
    DrHistoryComponent,
    ModalAcceptTermsComponent,
    ParisHistoryComponent,
    JackpotwinnerComponent,
    MinigamestransactionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    }],

})
export class UserModule { }
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
