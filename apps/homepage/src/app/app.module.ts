import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent, UiModule } from '@homepage/ui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from './translation.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, ProjectsComponent],
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
