import { Routes} from '@angular/router';
import { HomeC } from './home-c/home-c';
import { authGuard } from './pages/admin/guards/auth-guard';
export const routes: Routes = [
  { path: '', component: HomeC },
  { path: 'admin', canActivate: [authGuard],loadComponent: () => import('./pages/admin/admin').then(m => m.Admin)},
  { path: 'login', loadComponent: () => import('./pages/admin/login/login').then(m => m.Login)},
  { path: 'Dex' , loadComponent: () => import('./dex/dex').then(m => m.Dex)},
  //{ path: 'calc', loadComponent: () => import('./subnetcalc/subnetcalc').then(m => m.Subnetcalc) }
  {path: '**', redirectTo: ''},
];
