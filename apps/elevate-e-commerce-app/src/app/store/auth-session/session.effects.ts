import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SessionActions } from './session.actions';
import { map, tap } from 'rxjs';
import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';

@Injectable()
export class SessionEffects {
  private actions$ = inject(Actions);
  private ls = inject(LocalStorageService);

  restore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SessionActions.restoreFromStorage),
      map(() => {
        const token = this.ls.get('userToken') as string | null;
        return SessionActions.restoreDone({ token });
      })
    )
  );

  saveOnActivate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SessionActions.activate),
        tap(({ token }) => this.ls.set('userToken', token))
      ),
    { dispatch: false }
  );

  clear$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SessionActions.clear),
        tap(() => this.ls.remove('userToken'))
      ),
    { dispatch: false }
  );
}
