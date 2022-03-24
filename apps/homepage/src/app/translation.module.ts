import { HttpClient } from '@angular/common/http';
import {
  getBrowserLang,
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TRANSLOCO_LOADING_TEMPLATE,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';
import { Inject, Injectable, NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';
import { TRANSLOCO_PERSIST_LANG_STORAGE, TranslocoPersistLangModule } from '@ngneat/transloco-persist-lang';
import { PrimeNGConfig } from 'primeng/api';
import { filter, first, switchMap, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

@UntilDestroy()
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
  constructor(
    private translocoService: TranslocoService,
    @Inject(DOCUMENT) private document: Document,
    private primeNGConfig: PrimeNGConfig
  ) {
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

    this.translocoService.langChanges$
      .pipe(
        untilDestroyed(this),
        filter(lang => lang !== 'en'),
        switchMap(() =>
          this.translocoService.selectTranslateObject('primeng').pipe(
            first(),
            tap(translation => this.primeNGConfig.setTranslation(translation))
          )
        )
      )
      .subscribe();
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
