import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  getLoggedUserDataDTO,
  User,
} from '../types/getLoggedUserData.interface';
import { env } from '../../env/env';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly _http = inject(HttpClient);

  getLoggedUserData(): Observable<User> {
    const url = `${env.baseURL}/auth/profile-data`;
    return this._http
      .get<getLoggedUserDataDTO>(url)
      .pipe(map((res) => res.user));
  }
}
