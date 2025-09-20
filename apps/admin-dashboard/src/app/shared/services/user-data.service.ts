import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  getLoggedUserDataDTO,
  User,
} from '../types/getLoggedUserData.interface';
import { BASE_URL } from 'auth-apis';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private readonly baseUrl = inject(BASE_URL);
  private readonly _http = inject(HttpClient);

  getLoggedUserData(): Observable<User> {
    const url = `${this.baseUrl}/api/v1/auth/profile-data`;
    return this._http
      .get<getLoggedUserDataDTO>(url)
      .pipe(map((res) => res.user));
  }
}
