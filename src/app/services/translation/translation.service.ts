import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  castTranslate = new Subject();

  constructor(public translate: TranslateService,) {
  }
  updateTranslate(lang) {
    this.castTranslate.next(lang)
    this.translate.use(lang);
  }
}
