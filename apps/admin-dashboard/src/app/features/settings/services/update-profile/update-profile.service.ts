import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { env } from 'apps/admin-dashboard/src/app/env/env';
import { map, Observable } from 'rxjs';
import { ApiProfileResponse, ApiSuccess, ChangePasswordRequest, ChangePasswordResponse, UserProfile } from '../../interfaces/UserProfile/user-profile';
import { adaptUserProfile } from '../../adapters/adapt-profile/user-profile.adapter';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {


  // Call Services
  private readonly _http = inject(HttpClient)

  getUserProfile(): Observable<UserProfile> {
    return this._http.get<ApiProfileResponse>(`${env.baseURL}/auth/profile-data`,)
    .pipe(
      map(adaptUserProfile)
    ); 
  }


  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> { 
    return this._http.put<ApiProfileResponse>(`${env.baseURL}/auth/editProfile`, data,)
    .pipe(
      map(adaptUserProfile)
    ); 
  }


  uploadAvatar(file: File): Observable<string> {
    const fd = new FormData(); 
    fd.append('photo', file);
    return this._http.put<string >(`${env.baseURL}/auth/upload-photo`, fd);
  }


  changePassword(data: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this._http.patch<ChangePasswordResponse>(`${env.baseURL}/auth/change-password`, data);
  }

  logout(): Observable<ApiSuccess> {
    return this._http.get<ApiSuccess>(`${env.baseURL}/auth/logout`)
  }

  deleteAccount(): Observable<ApiSuccess> {
    return this._http.delete<ApiSuccess>(`${env.baseURL}/auth/deleteMe`, ) 
  }
}
