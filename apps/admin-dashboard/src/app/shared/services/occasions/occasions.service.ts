import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment as env } from '@elevate-e-commerce-app/shared-env';
import { catchError, map } from 'rxjs';
import { OccasionsRes } from '../../types/occasions';

@Injectable({
  providedIn: 'root',
})
export class OccasionsService {
  private readonly _httpClient = inject(HttpClient);

  getAllOccasions() {
    return this._httpClient
      .get<OccasionsRes>(`${env.baseUrl}/api/v1/occasions`)
      .pipe(
        map((res) => res.occasions),
        catchError(() => {
          throw 'Could not fetch occasions, Please try again later!!';
        })
      );
  }

  // addOccasion(data: AddCategoryData) {
  //   return this._httpClient.post(`${env.baseUrl}/api/v1/occasions`, data).pipe(
  //     map((res) => res),
  //     catchError(() => {
  //       throw 'Could not add a new occasion, Please try again later!!';
  //     })
  //   );
  // }

  updateOccasion(id: string, value: string) {
    return this._httpClient
      .put(`${env.baseUrl}/api/v1/occasions/${id}`, value)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not update this occasion, Please try again later!!';
        })
      );
  }

  deleteOccasion(id: string) {
    return this._httpClient
      .delete(`${env.baseUrl}/api/v1/occasions/${id}`)
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not delete this occasion, Please try again later!!';
        })
      );
  }
}
