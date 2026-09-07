import { Routes, RouterOutlet } from '@angular/router';
import { HomeC } from './home-c/home-c';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', component: HomeC },
  { path: 'admin', canActivate: [authGuard],loadComponent: () => import('./admin/admin').then(m => m.Admin)},
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)}
];
