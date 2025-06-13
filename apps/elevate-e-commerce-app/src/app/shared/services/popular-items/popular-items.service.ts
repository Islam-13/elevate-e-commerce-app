import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PopularItemsInterface } from '../../interfaces/popular-items-interface/popular-items-interface';
import { env } from '@env/env';

@Injectable({
  providedIn: 'root',
})
export class PopularItemsService {
  private readonly _httpClient = inject(HttpClient);

  getAllProducts(filters?: {
    keyword?: string;
    category?: string;
    'price[gt]'?: number;
    'price[lt]'?: number;
    'price[gte]'?: number;
    'price[lte]'?: number;
    fields?: string;
    limit?: number;
    sort?: string;
  }): Observable<PopularItemsInterface> {
    let params = new HttpParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this._httpClient.get<PopularItemsInterface>(
      env.baseURL + '/products',
      { params }
    );
  }
}
