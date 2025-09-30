import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Getallstatistics, Statistics } from '../../interfaces/getallstatistics/getallstatistics';
import { Getcategorystatistics, Statistic } from '../../interfaces/getcategorystatistics/getcategorystatistics';
import { environment } from '@elevate-e-commerce-app/shared-env';

@Injectable({
  providedIn: 'root'
})
export class OverviewsService {
  private readonly _http = inject(HttpClient);

  getAllStatistics(): Observable<Statistics> {
    return this._http.get<Getallstatistics>(`${environment.baseUrl}/api/v1/statistics`).pipe(
      map((res) => res.statistics),
      catchError(() => {
        throw 'Could not fetch statistics, Please try again later!!';
      })
    );
  }

  getCategoryStatistics(): Observable<Statistic[]> {
    return this._http.get<Getcategorystatistics>(`${environment.baseUrl}/api/v1/statistics/categories`).pipe(
      map((res) => res.statistics),
      catchError(() => {
        throw 'Could not fetch category statistics, Please try again later!!';
      })
    );
  }
}
