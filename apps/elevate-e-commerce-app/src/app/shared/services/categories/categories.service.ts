import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesInterfaces } from '../../interfaces/categories-interfaces/categories-interfaces';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
      private readonly _httpClient = inject(HttpClient);
      getAllCategories():Observable<CategoriesInterfaces>{
        return this._httpClient.get<CategoriesInterfaces>(env.baseURL + '/categories')
      }
}

