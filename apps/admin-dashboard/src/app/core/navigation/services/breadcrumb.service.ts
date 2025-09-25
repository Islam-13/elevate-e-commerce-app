import { inject, Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

import { MenuItem } from 'primeng/api';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private _breadcrumbs$ = new BehaviorSubject<MenuItem[]>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    console.log('BreadcrumbService created');
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        // debug: confirm nav fires
        console.log('NavigationEnd ->', this.router.url);
        const root = this.router.routerState.snapshot.root;
        const crumbs = this.buildBreadCrumb(root);
        this._breadcrumbs$.next(crumbs);
      });
  }

  private buildBreadCrumb(
    route: ActivatedRouteSnapshot,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    // get label from data (if any)
    const label = (route.data && route.data['breadcrumb']) || '';
    // build path from URL segments (actual values for params included)
    const path = route.url.map((segment) => segment.path).join('/');
    // accumulate url (avoid duplicate slashes)
    const nextUrl = path ? `${url}/${path}` : url;

    if (label) {
      // optionally replace placeholders in label with params, e.g. 'Update :id' -> 'Update 5'
      // merge params and resolved data into one object
      const values = { ...route.params, ...route.data };
      const labelWithParams = this.replaceLabelParams(label, values);
      breadcrumbs.push({ label: labelWithParams, routerLink: nextUrl || '/' });
      // const labelWithParams = this.replaceLabelParams(label, route.params);
      // breadcrumbs.push({ label: labelWithParams, routerLink: nextUrl || '/' });
    }

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, breadcrumbs);
    }
    return breadcrumbs;
  }

  private replaceLabelParams(
    label: string,
    params: { [k: string]: any }
  ): string {
    // replace :paramName occurrences in label if present
    return Object.keys(params || {}).reduce((acc, key) => {
      return acc.replace(new RegExp(`:${key}`, 'g'), params[key]);
    }, label);
  }
}
