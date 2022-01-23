import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'homepage-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent {
  languages$: Observable<{ name: string; code: string }[]>;
  selectedLanguage: string;

  constructor(private transloco: TranslocoService) {
    this.languages$ = this.bindLanguages();
    this.selectedLanguage = this.transloco.getActiveLang();
  }

  changeLanguage(languageCode: string) {
    this.transloco.setActiveLang(languageCode);
  }

  private bindLanguages(): Observable<{ name: string; code: string }[]> {
    return this.transloco.selectTranslateObject('languages').pipe(
      untilDestroyed(this),
      map(languages => [
        { name: languages.german, code: 'de' },
        { name: languages.english, code: 'en' }
      ])
    );
  }
}
