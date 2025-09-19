import { Route } from '@angular/router';
import { loggedUserGuard } from './features/auth/guards/loggedin.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { HomeComponent } from './features/pages/home/home.component';


export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [loggedUserGuard],
    component: AuthLayoutComponent,
    children: [
      {
        path: '', redirectTo:'login', pathMatch:'full'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './features/auth/pages/forget-password-steps/forget-password-steps.component'
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
          import('./features/pages/category/category.component').then(
            (c) => c.CategoryComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./layouts/cart-layout/cart-layout.component').then(
            (c) => c.CartLayoutComponent
          ),
      },
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import('./features/pages/product-details/product-details.component').then(
            (c) => c.ProductDetailsComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings-shell/settings-shell.component').then(
            (c) => c.SettingsShellComponent, 
          ),
          children:[
            { path: '',
              redirectTo:'profile',
              pathMatch:'full'
            },
            {path: 'profile',
              loadComponent: () =>
                import('./features/settings/pages/update-profile/update-profile.component').then(
                  (c) => c.UpdateProfileComponent,
                )
            },
            {path: 'password',
              loadComponent: () =>
                import('./features/settings/pages/update-password/update-password.component').then(
                  (c) => c.UpdatePasswordComponent,
                )
          },
        ]
      },
    ],
  },
];