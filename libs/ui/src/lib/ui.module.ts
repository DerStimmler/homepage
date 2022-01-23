import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  imports: [CommonModule, MenubarModule],
  declarations: [DefaultLayoutComponent, HeaderComponent, FooterComponent],
  exports: [DefaultLayoutComponent]
})
export class UiModule {
  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = false;
  }
}
