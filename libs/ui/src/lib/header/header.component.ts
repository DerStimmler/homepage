import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'homepage-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items$: Observable<MenuItem[]>;

  constructor(private transloco: TranslocoService) {
    this.items$ = this.bindMenuItems();
  }

  private bindMenuItems(): Observable<MenuItem[]> {
    return this.transloco.selectTranslateObject('menu').pipe(
      untilDestroyed(this),
      map(menu => [
        {
          label: menu.home,
          routerLink: '/home'
        },
        {
          label: menu.projects,
          routerLink: '/projects'
        }
      ])
    );
  }
}
