import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

export const loggedUserGuard: CanActivateFn = () => {
  const _router = inject(Router);
  const _storageManager = inject(LocalStorageService);

  const token = _storageManager.get('userToken');

  if (token) {
    _router.navigate(['/']);
    return false;
  } else return true;
};
