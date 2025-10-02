import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { OccasionsService } from './occasions.service';

@Injectable({ providedIn: 'root' })
export class OccasionResolver implements Resolve<string> {
  private readonly _occasionsService = inject(OccasionsService);

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const id = route.paramMap.get('id')!;

    return this._occasionsService.getOccasionById(id).pipe(
      map((occasion) => occasion.name) // return just the name
    );
  }
}
