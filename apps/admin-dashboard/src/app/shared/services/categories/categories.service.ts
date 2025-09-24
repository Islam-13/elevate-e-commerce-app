import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import { CategoriesRes, CategoryRes } from '../../types/categories';
import { environment as env } from '@elevate-e-commerce-app/shared-env';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly _httpClient = inject(HttpClient);

  getAllCategories() {
    return this._httpClient
      .get<CategoriesRes>(`${env.baseUrl}/api/v1/categories`)
      .pipe(
        map((res) => res.categories),
        catchError(() => {
          throw 'Could not fetch categories, Please try again later!!';
        })
      );
  }
  getCategoryById(id: string) {
    return this._httpClient
      .get<CategoryRes>(`${env.baseUrl}/api/v1/categories/${id}`)
      .pipe(
        map((res) => res.category),
        catchError(() => {
          throw 'Could not fetch category, Please try again later!!';
        })
      );
  }
  addCategory(id: string, value: string) {
    return this._httpClient
      .put(`${env.baseUrl}/api/v1/categories/${id}`, value)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not update category, Please try again later!!';
        })
      );
  }

  updateCategory(id: string, value: string) {
    return this._httpClient
      .put(`${env.baseUrl}/api/v1/categories/${id}`, value)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not update category, Please try again later!!';
        })
      );
  }

  deleteCategory(id: string) {
    return this._httpClient
      .delete(`${env.baseUrl}/api/v1/categories/${id}`)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not delete category, Please try again later!!';
        })
      );
  }
}
