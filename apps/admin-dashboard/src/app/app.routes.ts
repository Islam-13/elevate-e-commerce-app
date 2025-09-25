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
        loadComponent: () =>
          import('./features/categories/categories.component').then(
            (c) => c.CategoriesComponent
          ),
        data: { breadcrumb: 'categories' },

        children: [
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
            data: { breadcrumb: 'Update Category: :categoryName ' },
          },
        ],
      },
      {
        path: '**',
        loadComponent: () =>
          import(
            '../../../../libs/not-found/src/lib/not-found/not-found.component'
          ).then((c) => c.NotFoundComponent),
        data: { breadcrumb: 'Not Found' },
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
      },
    ],
  },
];
