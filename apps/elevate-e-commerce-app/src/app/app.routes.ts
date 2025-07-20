import { Route } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { loggedUserGuard } from './auth/guards/loggedin.guard';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [loggedUserGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./auth/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './auth/pages/forget-password-steps/forget-password-steps.component'
          ).then((c) => c.ForgetPasswordStepsComponent),
      },
    ],
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/category/category.component').then(
            (c) => c.CategoryComponent
          ),
      },
    ],
  },
];
