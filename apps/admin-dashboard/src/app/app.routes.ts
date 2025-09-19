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
      },
    ],
  },
];
