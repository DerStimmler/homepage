import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';

@NgModule({
  imports: [CommonModule]
})
export class UiModule {
  constructor(private primengConfig: PrimeNGConfig) {
    this.primengConfig.ripple = false;
  }
}
