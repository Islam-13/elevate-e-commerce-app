import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import { CategoriesInterfaces } from '../../interfaces/categories-interfaces/categories-interfaces';
import { env } from '@env/env';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);

  getAllCategories() {
    return this._httpClient
      .get<CategoriesInterfaces>(env.baseURL + '/categories')
      .pipe(
        map((res) => res.categories),
        catchError(() => {
          throw 'Could not fetch categories, Please try again later!!';
        })
      );
  }
}
