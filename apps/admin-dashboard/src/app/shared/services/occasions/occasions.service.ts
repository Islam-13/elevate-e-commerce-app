import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment as env } from '@elevate-e-commerce-app/shared-env';
import { catchError, map } from 'rxjs';
import {
  AddOccasionData,
  GetOccasionRes,
  OccasionsRes,
} from '../../types/occasions';

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

  getOccasionById(id: string) {
    return this._httpClient
      .get<GetOccasionRes>(`${env.baseUrl}/api/v1/occasions/${id}`)
      .pipe(
        map((res) => res.occasion),
        catchError(() => {
          throw 'Could not fetch occasion, Please try again later!!';
        })
      );
  }

  addOccasion(data: AddOccasionData) {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('image', data.image);

    return this._httpClient.post(`${env.baseUrl}/api/v1/occasions`, fd).pipe(
      map((res) => res),
      catchError(() => {
        throw 'Could not add a new occasion, Please try again later!!';
      })
    );
  }

  updateOccasion(id: string, data: AddOccasionData) {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('image', data.image);

    return this._httpClient
      .put(`${env.baseUrl}/api/v1/occasions/${id}`, fd)
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
