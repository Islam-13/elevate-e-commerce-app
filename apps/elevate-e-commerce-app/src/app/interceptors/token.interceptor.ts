import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _localStorage = inject(LocalStorageService);
  const token = _localStorage.get('userToken');

  if (token)
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(req);
};
