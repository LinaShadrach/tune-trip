
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AboutComponent } from './about/about.component';


const appRoutes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
  {
  path: 'show-list',
  component: ShowListComponent
  },
  {
  path: 'about',
  component: AboutComponent
  }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
