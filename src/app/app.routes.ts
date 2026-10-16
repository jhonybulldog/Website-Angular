import { Routes} from '@angular/router';
import { HomeC } from './pages/Home/home-c/home-c';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
  { path: '', component: HomeC },
  { path: 'admin', canActivate: [authGuard],loadComponent: () => import('./pages/admin/admin').then(m => m.Admin)},
  { path: 'login', loadComponent: () => import('./core/login/login').then(m => m.Login)},
  { path: 'Dex' , loadComponent: () => import('./pages/dex/dex').then(m => m.Dex)},
  {path: 'calc', loadComponent: () => import('./pages/subnetcalc/subnetcalc').then(m => m.Subnetcalc) },
  { path: 'shop' , loadComponent: () => import('./pages/shop/shop').then(m => m.Shop)},
  {path: 'shop/cart', loadComponent: () => import('./pages/shop/features/carrello/carrello').then(m => m.Carrello)},
  {path: 'shop/stats', canActivate: [authGuard],loadComponent: () => import('./pages/shop/features/stats/stats').then(m => m.Stats)},
  {path: 'shop/compare', loadComponent: () => import('./pages/shop/features/compare/compare').then(m => m.Compare)},
  {path: 'shop/:id', loadComponent: () => import('./pages/shop/features/productdetail/productdetail').then(m => m.Productdetail)},
  {path: 'checkout',loadComponent: () => import('./pages/shop/features/checkout/checkout').then(m => m.Checkout)},
  {path: 'dashboard', canActivate: [authGuard],loadComponent: () => import('./pages/account/dashboard/dashboard').then(m => m.Dashboard)},
  {path: 'blog', loadComponent:() => import ('./pages/blog/blog').then(m => m.Blog)},
  {path: 'blog/:id', loadComponent: () => import('./pages/blog/features/blogdetail/blogdetail').then(m => m.Blogdetail)},
  { path: 'todos', loadComponent: () => import('./pages/todos/todos').then(m => m.Todos) },
  {path: '**', redirectTo: ''},
];
