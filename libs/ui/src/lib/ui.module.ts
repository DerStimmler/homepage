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
import { ThemeService } from './theme.service';
import { ThemeSelectionComponent } from './theme-selection/theme-selection.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DarkModeSelectionComponent } from './dark-mode-selection/dark-mode-selection.component';
import { ColorSelectionComponent } from './color-selection/color-selection.component';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { ThreeDimensionalTextComponent } from './three-dimensional-text/three-dimensional-text.component';

@NgModule({
  imports: [
    CommonModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    OverlayPanelModule,
    ButtonModule,
    InputSwitchModule,
    DividerModule,
    ListboxModule
  ],
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    LanguageSelectionComponent,
    ThemeSelectionComponent,
    DarkModeSelectionComponent,
    ColorSelectionComponent,
    ThreeDimensionalTextComponent
  ],
  exports: [DefaultLayoutComponent, ThreeDimensionalTextComponent]
})
export class UiModule {
  constructor(private primengConfig: PrimeNGConfig, private themeService: ThemeService) {
    this.primengConfig.ripple = false;
    this.themeService.applyCurrentTheme();
  }
}
