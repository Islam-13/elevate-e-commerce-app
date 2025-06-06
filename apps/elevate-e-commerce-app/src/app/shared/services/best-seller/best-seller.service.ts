import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import { env } from '@env/env';
import { BestSellerRes } from '@shared/interfaces/best-seller';

@Injectable({
  providedIn: 'root',
})
export class BestSellerService {
  private readonly _http = inject(HttpClient);
  private readonly _baseURL = env.baseURL;

  getBestSeller() {
    return this._http.get<BestSellerRes>(`${this._baseURL}/best-seller`).pipe(
      map((res) => res.bestSeller),
      catchError(() => {
        throw 'Could not fetch best seller, Please try again later!!';
      })
    );
  }
}
