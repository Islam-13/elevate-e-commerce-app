import { Route } from '@angular/router';
import { CategoryResolver } from './shared/services/categories/category.resolver';
import { OccasionResolver } from './shared/services/occasions/occasion.resolver';
import { ProductResolver } from './shared/services/products/product.resolver';

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
          import('./features/pages/overviews/overviews.component').then(
            (c) => c.OverviewsComponent
          ),
      },

      {
        path: 'categories',
        data: { breadcrumb: 'Categories' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/pages/categories/categories.component').then(
                (c) => c.CategoriesComponent
              ),
            data: { breadcrumb: '' },
          },
          {
            path: 'add-category',
            loadComponent: () =>
              import(
                './features/components/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
            data: { breadcrumb: 'Add Category' },
          },
          {
            path: 'update-category/:id',
            loadComponent: () =>
              import(
                './features/components/add-update-category/add-update-category.component'
              ).then((c) => c.AddUpdateCategoryComponent),
            resolve: { categoryName: CategoryResolver },
            data: {
              breadcrumb: 'Update Category: :categoryName',
            },
          },
        ],
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

          {
            path: 'add-occasion',
            loadComponent: () =>
              import(
                './features/add-update-occasion/add-update-occasion.component'
              ).then((c) => c.AddUpdateOccasionComponent),
            data: { breadcrumb: 'Add Occasion' },
          },

          {
            path: 'update-occasion/:id',
            loadComponent: () =>
              import(
                './features/add-update-occasion/add-update-occasion.component'
              ).then((c) => c.AddUpdateOccasionComponent),
            resolve: { occasionName: OccasionResolver },
            data: {
              breadcrumb: 'Update Occasion: :occasionName',
            },
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
          {
            path: 'add-product',
            loadComponent: () =>
              import(
                './features/add-update-product/add-update-product.component'
              ).then((c) => c.AddUpdateProductComponent),
            data: { breadcrumb: 'Add Product' },
          },
          {
            path: 'update-product/:id',
            loadComponent: () =>
              import(
                './features/add-update-product/add-update-product.component'
              ).then((c) => c.AddUpdateProductComponent),
            resolve: { productTitle: ProductResolver },
            data: {
              breadcrumb: 'Update Product: :productTitle',
            },
          },
        ],
      },

      {
        path: '**',
        loadComponent: () =>
          import('@myorg/not-found').then((c) => c.NotFoundComponent),
        data: { breadcrumb: 'Not Found' },
      },
    ],
  },
];
