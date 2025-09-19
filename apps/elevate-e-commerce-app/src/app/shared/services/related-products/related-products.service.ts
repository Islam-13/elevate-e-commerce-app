import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@env/env';
import { RelatedProductsInterface } from '@shared/interfaces/related-products-interface/related-products-interface';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatedProductsService {
  private readonly _http = inject(HttpClient);


  getRelatedProducts(productId: string) {
    return this._http.get<RelatedProductsInterface>(`${env.baseURL}/related/category/${productId}`).pipe(
      map((res) => res.relatedProducts),
      catchError(() => {
        throw 'Could not fetch related products, Please try again later!!';
      })
    );
  }
}
