import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

export const loggedUserGuard: CanActivateFn = () => {
  const _localStorageService = inject(LocalStorageService);
  const _router = inject(Router);

  const token = _localStorageService.get('userToken');

  if (token) {
    _router.navigate(['/']);
    return false;
  } else return true;
};
