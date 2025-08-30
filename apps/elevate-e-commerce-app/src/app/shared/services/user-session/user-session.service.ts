import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  // Call Services
  private readonly _localStorageService = inject(LocalStorageService)

  // Create Variable
  // !! Converts any value into an explicit boolean
  token = signal<boolean>(!!this._localStorageService.get('userToken'));

  // Set token true to activate user login session 
  activateSession(): void {
    this.token.set(true);
  }

  // Set token false to clear user login session 
  clearSession(): void {
    this.token.set(false);
  }

}
