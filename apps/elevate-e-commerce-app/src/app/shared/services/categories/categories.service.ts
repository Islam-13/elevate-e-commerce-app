import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from '../../../env/env';
featurs/categories-b
import { CategoriesInterfaces } from '../../interfaces/categories-interfaces/categories-interfaces';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
      private readonly _httpClient = inject(HttpClient);
 featurs/categories-b


      getAllCategories():Observable<any>{
        return this._httpClient.get<CategoriesInterfaces>(env.baseURL + '/categories')
      }
}

