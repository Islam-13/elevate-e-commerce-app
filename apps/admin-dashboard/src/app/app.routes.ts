import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        './core/navigation/components/navigation/navigation.component'
      ).then((c) => c.NavigationComponent),
    children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' }, // default route

      {
        path: 'Dashboard',
        loadComponent: () =>
          import(
            './features/overView/components/overview/overview.component'
          ).then((c) => c.OverviewComponent),
        data: { breadcrumb: 'Dashboard' },

        children: [
          {
            path: 'users',
            loadComponent: () =>
              import(
                './core/navigation/components/business/user-image/user-image.component'
              ).then((c) => c.UserImageComponent),
            data: { breadcrumb: 'users' },
          },
          {
            path: 'category',
            loadComponent: () =>
              import(
                './core/navigation/components/business/user-image/user-image.component'
              ).then((c) => c.UserImageComponent),
            data: { breadcrumb: 'category' },
          },
        ],
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
      },
      {
        path: 'categories/add-category',
        loadComponent: () =>
          import(
            './features/add-update-category/add-update-category.component'
          ).then((c) => c.AddUpdateCategoryComponent),
      },
      {
        path: 'categories/update-category/:id',
        loadComponent: () =>
          import(
            './features/add-update-category/add-update-category.component'
          ).then((c) => c.AddUpdateCategoryComponent),
      },
    ],
  },
];
