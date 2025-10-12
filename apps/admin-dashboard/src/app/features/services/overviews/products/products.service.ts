import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '@elevate-e-commerce-app/shared-env';
import { ApiStatisticsResponse, LowStockItem, TopSellingItem } from '../../../interfaces/products/products';
import { adaptLowStock, adaptTopSelling } from '../../../adapters/products.adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly http = inject(HttpClient)


  getTopSelling(): Observable<TopSellingItem[]> {
    return this.http.get<ApiStatisticsResponse>(`${environment.baseUrl}/api/v1/statistics/products`)
      .pipe(
        map(res => res.statistics.topSellingProducts.map(adaptTopSelling))
      );
  }


  getLowStock(): Observable<LowStockItem[]> {
    return this.http.get<ApiStatisticsResponse>(`${environment.baseUrl}/api/v1/statistics/products`)
      .pipe(
        map(res => res.statistics.lowStockProducts.map(adaptLowStock))
      );
  }

}
