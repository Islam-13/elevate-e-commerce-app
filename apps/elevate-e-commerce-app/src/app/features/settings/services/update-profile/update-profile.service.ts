import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from '@env/env';
import { map, Observable } from 'rxjs';
import { adaptUserProfile } from '../../adapters/adapt-profile/user-profile.adapter';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { ApiDeleteResponse, ApiProfileResponse, ChangePasswordRequest, ChangePasswordResponse, UserProfile } from '../../interfaces/UserProfile/user-profile';


@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  // Call Services
  private readonly _http = inject(HttpClient)
  private readonly _localStorageService = inject(LocalStorageService)


  getUserProfile(): Observable<UserProfile> {
    return this._http.get<ApiProfileResponse>(`${env.baseURL}/auth/profile-data`, {
      headers: {Authorization : `Bearer ${this._localStorageService.get('userToken')}`}
    })
    .pipe(
      map(adaptUserProfile)
    ); 
  }


  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> { 
    return this._http.put<ApiProfileResponse>(`${env.baseURL}/auth/editProfile`, data, {
      headers: {Authorization: `Bearer ${this._localStorageService.get('userToken')}`}
    })
    .pipe(
      map(adaptUserProfile)
    ); 
  }


  uploadAvatar(file: File): Observable<string> {
    const fd = new FormData(); 
    fd.append('photo', file);
    return this._http.put<string >(`${env.baseURL}/auth/upload-photo`, fd,{
      headers: {Authorization: `Bearer ${this._localStorageService.get('userToken')}`}
    });
  }


  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this._http.patch<ChangePasswordResponse>(`${env.baseURL}/auth/change-password`, data, {
      headers: {Authorization: `Bearer ${this._localStorageService.get('userToken')}`}
    });
  }

  deleteAccount(): Observable<ApiDeleteResponse> {
    return this._http.delete<ApiDeleteResponse>(`${env.baseURL}/auth/deleteMe`, {
      headers: {Authorization: `Bearer ${this._localStorageService.get('userToken')}`}
    }) 
  }
}
