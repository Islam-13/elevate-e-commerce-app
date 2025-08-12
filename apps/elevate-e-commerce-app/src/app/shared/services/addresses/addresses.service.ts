import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { env } from '@env/env';
import {
  AddressesRes,
  CreateAddresses,
  DeleteAddressesRes,
} from '@shared/interfaces/addresses';
import { catchError, map } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  private readonly _http = inject(HttpClient);
  private readonly _baseURL = env.baseURL;
  private readonly _localStorage = inject(LocalStorageService);

  getAddresses() {
    return this._http
      .get<AddressesRes>(`${this._baseURL}/addresses`, {
        headers: {
          Authorization: `Bearer ${this._localStorage.get('userToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((res) => res.addresses),
        catchError(() => {
          throw 'Could not fetch addresses, Please try again later!!';
        })
      );
  }

  deleteAddress(id: string) {
    return this._http
      .delete<DeleteAddressesRes>(`${this._baseURL}/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${this._localStorage.get('userToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((res) => res.address),
        catchError(() => {
          throw 'Could not delete addresse, Please try again later!!';
        })
      );
  }

  addAddress(payload: CreateAddresses) {
    return this._http
      .patch(`${this._baseURL}/addresses`, payload, {
        headers: {
          Authorization: `Bearer ${this._localStorage.get('userToken')}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((res) => res),
        catchError(() => {
          throw 'Could not add addresse, Please try again later!!';
        })
      );
  }
}
