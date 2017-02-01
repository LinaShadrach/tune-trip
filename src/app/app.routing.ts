import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './splash/splash.component';
import { ShowListComponent } from './show-list/show-list.component';
import { AboutComponent } from './about/about.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';

const appRoutes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
  {
  path: 'show-list/:id',
  component: ShowListComponent
  },
  {
  path: 'about',
  component: AboutComponent
},
  {
  path: 'show-detail',
  component: ShowDetailComponent
  }
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
