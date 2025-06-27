import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/category/category.component').then(
        (c) => c.CategoryComponent
      ),
  },
];
