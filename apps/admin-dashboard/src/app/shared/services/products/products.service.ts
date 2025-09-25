import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import { ProductsRes } from '../../types/products';
import { environment as env } from '@elevate-e-commerce-app/shared-env';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);

  getAllProducts() {
    return this._httpClient
      .get<ProductsRes>(`${env.baseUrl}/api/v1/products`)
      .pipe(
        map((res) => res.products),
        catchError(() => {
          throw 'Could not fetch products, Please try again later!!';
        })
      );
  }

  deleteProduct(id: string) {
    return this._httpClient.delete(`${env.baseUrl}/api/v1/products/${id}`).pipe(
      map((res) => res),
      catchError(() => {
        throw 'Could not delete this product, Please try again later!!';
      })
    );
  }
}
