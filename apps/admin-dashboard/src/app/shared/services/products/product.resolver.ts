import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<string> {
  private readonly _ProductsService = inject(ProductsService);

  resolve(route: ActivatedRouteSnapshot): Observable<string> {
    const id = route.paramMap.get('id')!;
    return this._ProductsService.getProductById(id).pipe(
      map((product) =>product.title ) // return just the name
    );
  }
}
