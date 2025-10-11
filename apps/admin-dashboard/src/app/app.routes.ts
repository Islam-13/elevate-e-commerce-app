import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/navigation/components/navigation/navigation.component'
      ).then((c) => c.NavigationComponent),
    children: [
      { path: '', redirectTo: 'overviews', pathMatch: 'full' }, 

        {
          path: 'overviews',
          loadComponent: () =>
            import(
              './features/pages/overviews/overviews.component'
            ).then((c) => c.OverviewsComponent),
          data: { breadcrumb: 'overviews' },
          },
          {
            path: 'users',
            loadComponent: () =>
              import(
                './core/navigation/components/business/user-image/user-image.component'
              ).then((c) => c.UserImageComponent),
            data: { breadcrumb: 'users' },
          },
          {
            path: 'settings',
            loadComponent: () =>
              import(
                './features/settings/pages/settings-shell/settings-shell.component'
              ).then((c) => c.SettingsShellComponent),
              children: [
                {path: '', redirectTo:'profile', pathMatch: 'full'},
                {
                  path:'profile',
                  loadComponent: () => 
                    import('./features/settings/pages/update-profile/update-profile.component').then(
                      (c) => c.UpdateProfileComponent
                    )
                },
                {
                  path:'password',
                  loadComponent: () => 
                    import('./features/settings/pages/update-password/update-password.component').then(
                      (c) => c.UpdatePasswordComponent
                    )
                },
              ]
          },
          {
            path: 'categories',
            loadComponent: () =>
              import('./features/pages/categories/categories.component').then(
                (c) => c.CategoriesComponent
              ),
          },
          {
            path: 'categories/add-category',
            loadComponent: () =>
              import(
                './features/components/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
          },
          {
            path: 'categories/update-category/:id',
            loadComponent: () =>
              import(
                './features/components/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
          }
        ],

  },
];
