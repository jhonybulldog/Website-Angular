import { Routes } from '@angular/router';
import { HomeC } from './pages/Home/home-c/home-c';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeC },
  { path: 'login', loadComponent: () => import('./core/login/login').then(m => m.Login) },
  { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./pages/admin/admin').then(m => m.Admin) },
  { path: 'dex', loadComponent: () => import('./pages/dex/dex').then(m => m.Dex) },
  { path: 'subnet-calc', loadComponent: () => import('./pages/subnetcalc/subnetcalc').then(m => m.Subnetcalc) },
  { path: 'todos', loadComponent: () => import('./pages/todos/todos').then(m => m.Todos) },

  {
    path: 'shop',
    children: [
      { path: '', loadComponent: () => import('./pages/shop/shop').then(m => m.Shop) },
      { path: 'cart', loadComponent: () => import('./pages/shop/features/carrello/carrello').then(m => m.Carrello) },
      { path: 'checkout', loadComponent: () => import('./pages/shop/features/checkout/checkout').then(m => m.Checkout) },
      { path: 'compare', loadComponent: () => import('./pages/shop/features/compare/compare').then(m => m.Compare) },
      { path: 'stats', canActivate: [authGuard], loadComponent: () => import('./pages/shop/features/stats/stats').then(m => m.Stats) },
      { path: ':id', loadComponent: () => import('./pages/shop/features/productdetail/productdetail').then(m => m.Productdetail) },
    ]
  },

  {
    path: 'blog',
    children: [
      { path: '', loadComponent: () => import('./pages/blog/blog').then(m => m.Blog) },
      { path: ':id', loadComponent: () => import('./pages/blog/features/blogdetail/blogdetail').then(m => m.Blogdetail) },
    ]
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
     loadComponent: () => import('./pages/account/dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {path: '', redirectTo: 'last-purchases', pathMatch: 'full'},
      { path: 'last-purchases', loadComponent: () => import('./pages/account/dashboard/features/last-p/last-p').then(m => m.LastP) },
      { path: 'category-fav',  loadComponent: () => import('./pages/account/dashboard/features/category-fav/category-fav').then(m => m.CategoryFav) },
      { path: 'product-fav', loadComponent: () => import('./pages/account/dashboard/features/product-fav/product-fav').then(m => m.ProductFav) },
      { path: 'my-blog', loadComponent: () => import('./pages/account/dashboard/features/my-blog/my-blog').then(m => m.MyBlog) },
    ]
  },

  { path: '**', redirectTo: '' },
];