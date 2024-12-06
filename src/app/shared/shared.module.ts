import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { AmlPolicyComponent } from './aml-policy/aml-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResponsibleGamingComponent } from './responsible-gaming/responsible-gaming.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Page404Component } from './page404/page404.component';
import { PubComponent } from './pub/pub.component';
import { RegisterComponent } from './register/register.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatComponent } from './chat/chat.component';
import { ModalJackpotTermsComponent } from './modal-jackpot-terms/modal-jackpot-terms.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { PubMessageComponent } from './pub-message/pub-message.component';
import { ElementMaintainComponent } from './element-maintain/element-maintain.component';
import { ImageslidComponent } from './imageslid/imageslid.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    AmlPolicyComponent,
    PrivacyPolicyComponent,
    ResponsibleGamingComponent,
    TermsAndConditionsComponent,
    Page404Component,

    PubComponent,
    RegisterComponent,
    ChatComponent,
    ModalJackpotTermsComponent,
    PubMessageComponent,
    ElementMaintainComponent,
    ImageslidComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    FormsModule,
    ClickOutsideModule
  ],
  exports: [NavBarComponent, FooterComponent, PubComponent, TranslateModule, ChatComponent, PubMessageComponent,ElementMaintainComponent,ImageslidComponent]
})
export class SharedModule {
  constructor(translate: TranslateService) {
  }
}
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}