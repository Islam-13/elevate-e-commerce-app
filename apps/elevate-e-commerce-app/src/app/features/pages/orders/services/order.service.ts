import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponseDTO } from '../interfaces/orders.interface';
import { env } from '@env/env';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}
  private readonly http = inject(HttpClient);

  getUserOrders(): Observable<OrderResponseDTO> {
    const url = `${env.baseURL}/orders`;
    return this.http.get<OrderResponseDTO>(url);
  }
}
