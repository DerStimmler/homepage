import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent, UiModule } from '@homepage/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from './translation.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent
  },
  {
    path: 'projects',
    component: DefaultLayoutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UiModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking', preloadingStrategy: PreloadAllModules }),
    TranslationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
