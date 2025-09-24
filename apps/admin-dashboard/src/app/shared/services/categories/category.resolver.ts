import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CategoriesService } from './categories.service';
 
@Injectable({ providedIn: 'root' })
export class CategoryResolver implements Resolve<string> {
  private readonly _categoriesService = inject(CategoriesService);

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const id = route.paramMap.get('id')!;
    return this._categoriesService.getCategoryById(id).pipe(
      map((category) => category.name) // return just the name
    );
  }
}