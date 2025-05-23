import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../env/env';
import { HttpClient } from '@angular/common/http';
import { PopularItemsInterface } from '../../interfaces/popular-items-interface/popular-items-interface';

@Injectable({
  providedIn: 'root'
})
export class PopularItemsService {
    private readonly _httpClient = inject(HttpClient);

      getAllProducts():Observable<PopularItemsInterface>{
        return this._httpClient.get<PopularItemsInterface>(environment.apiUrl + '/products')
      }
}
