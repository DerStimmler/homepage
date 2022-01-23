import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { LanguageSelectionComponent } from './language-selection/language-selection.component';

@NgModule({
  imports: [CommonModule, MenubarModule, DropdownModule, FormsModule],
  declarations: [DefaultLayoutComponent, HeaderComponent, FooterComponent, LanguageSelectionComponent],
  exports: [DefaultLayoutComponent]
})
export class UiModule {
  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = false;
  }
}
