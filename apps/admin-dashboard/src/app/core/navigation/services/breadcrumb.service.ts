import { inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbs: MenuItem[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('router', this.router.routerState.snapshot.root);
        this.breadcrumbs = this.createBreadcrumbs(
          this.router.routerState.snapshot.root
        );
      });
  }

  private createBreadcrumbs(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRouteSnapshot[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (
        child.routeConfig &&
        child.routeConfig.data &&
        child.routeConfig.data['breadcrumb']
      ) {
        const routeURL: string = child.url
          .map((segment) => segment.path)
          .join('/');
        url += `/${routeURL}`;

        const breadcrumb: MenuItem = {
          label: child.routeConfig.data['breadcrumb'],
          routerLink: url,
        };

        breadcrumbs.push(breadcrumb);
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    console.log(breadcrumbs);

    return breadcrumbs;
  }
}
