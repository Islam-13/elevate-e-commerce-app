import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@env/env';
import { OccasionsRes } from '@shared/interfaces/occasions';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OccasionsService {
  private readonly _http = inject(HttpClient);
  private readonly _baseURL = env.baseURL;

  getOccasions() {
    return this._http.get<OccasionsRes>(`${this._baseURL}/occasions`).pipe(
      map((res) => res.occasions),
      catchError(() => {
        throw 'Could not fetch occasions, Please try again later!!';
      })
    );
  }
}
