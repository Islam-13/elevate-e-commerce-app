import { Route } from '@angular/router';
import { CategoryResolver } from './shared/services/categories/category.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./core/navigation/components/layout/adminLayout.component').then(
        (c) => c.AdminLayoutComponent
      ),
    data: { breadcrumb: 'dashboard' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }, // default route
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/overView/components/overview/overview.component'
          ).then((c) => c.OverviewComponent),
      },

      {
        path: 'categories',
        data: { breadcrumb: 'Categories' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/categories/categories.component').then(
                (c) => c.CategoriesComponent
              ),
            data: { breadcrumb: '' },
          },
          {
            path: 'add-category',
            loadComponent: () =>
              import(
                './features/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
            data: { breadcrumb: 'Add Category' },
          },
          {
            path: 'update-category/:id',
            loadComponent: () =>
              import(
                './features/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
            resolve: { categoryName: CategoryResolver },
            data: {
              breadcrumb: 'Update Category: :categoryName',
            },
          },
        ],
      },

      {
        path: 'occasions',
        data: { breadcrumb: 'Occasions' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/occasions/occasions.component').then(
                (c) => c.OccasionsComponent
              ),
            data: { breadcrumb: '' },
          },
        ],
      },

      {
        path: 'products',
        data: { breadcrumb: 'products' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/products/products.component').then(
                (c) => c.ProductsComponent
              ),
            data: { breadcrumb: '' },
          },
        ],
      },

      {
        path: '**',
        loadComponent: () =>
          // eslint-disable-next-line @nx/enforce-module-boundaries
          import(
            '../../../../libs/not-found/src/lib/not-found/not-found.component'
          ).then((c) => c.NotFoundComponent),
        data: { breadcrumb: 'Not Found' },
      },
    ],
  },
];
