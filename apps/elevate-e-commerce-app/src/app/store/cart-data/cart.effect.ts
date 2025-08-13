import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { ApplyData, getTotal, updateCount } from "./cart.actions";

export class CartEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _store = inject(Store);

  readonly autoApplyData$ = createEffect(() =>
    this._actions$.pipe(
      ofType(getTotal, updateCount),
      tap(() => {
        this._store.dispatch(ApplyData());
      })
    ),
    { dispatch:false}
);
}