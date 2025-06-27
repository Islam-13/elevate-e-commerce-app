import { Route } from '@angular/router';

export const appRoutes: Route[] = [
 {
            path:'',
            redirectTo:'home',
            pathMatch:'full',
      },
      {  
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
    {path: 'AllProducts',loadComponent: () =>import('./pages/allproducts/allproducts.component').then((c) => c.AllproductsComponent)},

];
