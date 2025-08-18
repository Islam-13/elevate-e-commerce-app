import { Route } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { loggedUserGuard } from './auth/guards/loggedin.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

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
       {path: 'cart',
        loadComponent: ()=>
          import('./layouts/cart-layout/cart-layout.component').then(
            (c) => c.CartLayoutComponent
          )



      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import('./pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./pages/check-out/check-out.component').then(
            (c) => c.CheckOutComponent
          ),
      },
    ],
  },
];
