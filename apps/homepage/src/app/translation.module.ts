import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
  getBrowserLang,
  TRANSLOCO_LOADING_TEMPLATE
} from '@ngneat/transloco';
import { Inject, Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';
import { TRANSLOCO_PERSIST_LANG_STORAGE, TranslocoPersistLangModule } from '@ngneat/transloco-persist-lang';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
  imports: [
    TranslocoModule,
    TranslocoPersistLangModule.forRoot({
      storage: {
        provide: TRANSLOCO_PERSIST_LANG_STORAGE,
        useValue: localStorage
      }
    })
  ],
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'de'],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader, deps: [HttpClient] },
    {
      provide: TRANSLOCO_LOADING_TEMPLATE,
      useValue: '<p>loading...</p>'
    }
  ]
})
export class TranslationModule {
  constructor(private translocoService: TranslocoService, @Inject(DOCUMENT) private document: Document) {
    //registerLocaleData(localeDe);

    const availableLanguages = translocoService.getAvailableLangs() as string[];
    const defaultLanguage = translocoService.getDefaultLang();
    const browserLanguage = getBrowserLang() as string;
    const lastLanguage = localStorage.getItem('translocoLang');

    const activeLanguage = this.chooseActiveLanguage(
      availableLanguages,
      defaultLanguage,
      browserLanguage,
      lastLanguage
    );

    this.translocoService.setActiveLang(activeLanguage);

    this.document.documentElement.lang = this.translocoService.getActiveLang();
  }

  chooseActiveLanguage(
    availableLanguages: string[],
    defaultLanguage: string,
    browserLanguage: string,
    lastLanguage: string | null
  ): string {
    if (lastLanguage && availableLanguages.includes(lastLanguage)) {
      return lastLanguage;
    }

    if (availableLanguages.includes(browserLanguage)) {
      return browserLanguage;
    }

    return defaultLanguage;
  }
}
