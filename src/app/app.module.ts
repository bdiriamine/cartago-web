import { LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashChangeLocationStrategy } from 'ngx-hashchange-location-strategy';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInterceptor } from './core/interceptor/header.interceptor';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaintenaceComponent } from './maintenace/maintenace.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ErrorInterceptorService } from './core/interceptor/error-interceptor.service';
const config: SocketIoConfig = { url: 'https://socket.carthagobet.tn/', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MaintenaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SocketIoModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule


  ],
  exports: [
    ToastrModule
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashChangeLocationStrategy     },
    NgxImageCompressService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  },

    // { provide: ErrorHandler, useClass: ErrorInterceptorService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}