import { Routes, RouterOutlet } from '@angular/router';
import { HomeC } from './home-c/home-c';

export const routes: Routes = [
  { path: '', component: HomeC },
  //{ path: '/admin', loadComponent: () => import('./admin/admin'.then(m => m.admin)}
];
