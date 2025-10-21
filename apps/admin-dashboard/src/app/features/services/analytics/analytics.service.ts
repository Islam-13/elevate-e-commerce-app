import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiRevenueResponse, RevenueData } from '../../interfaces/analytics/analytics';
import { map, Observable } from 'rxjs';
import { environment } from '@elevate-e-commerce-app/shared-env';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private http = inject(HttpClient);

  getRevenue(): Observable<RevenueData> {
    return this.http.get<ApiRevenueResponse>(`${environment.baseUrl}/api/v1/statistics/orders`).pipe(
      map((res) => ({
        monthlyLabels: res.statistics.monthlyRevenue.map( x => x._id).reverse(),
        monthlyValues: res.statistics.monthlyRevenue.map(x => x.revenue).reverse(),
        dailyLabels: res.statistics.dailyRevenue.map(x => x._id).reverse(),
        dailyValues: res.statistics.dailyRevenue.map(x => x.revenue).reverse(),
      }))
    );
  }
}
