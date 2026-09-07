import { Routes, RouterOutlet } from '@angular/router';
import { HomeC } from './home-c/home-c';
import { Login } from './login/login';
export const routes: Routes = [
  { path: '', component: HomeC },
  //{ path: '/admin', loadComponent: () => import('./admin/admin'.then(m => m.admin)}
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)}
];
