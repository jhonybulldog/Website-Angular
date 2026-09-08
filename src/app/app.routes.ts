import { Routes} from '@angular/router';
import { HomeC } from './home-c/home-c';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [
  { path: '', component: HomeC },
  { path: 'admin', canActivate: [authGuard],loadComponent: () => import('./admin/admin').then(m => m.Admin)},
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)},
  { path: 'Dex' , loadComponent: () => import('./dex/dex').then(m => m.Dex)}
];
