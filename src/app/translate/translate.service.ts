import { Injectable } from '@angular/core';
import { TranslateService  as TranslateServiceLib } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private translate: TranslateServiceLib) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  get tranlate() {
    return this.translate;
  }

  set translateSetLang(lang: string) {
    this.translate.setDefaultLang(lang);
  }
}
