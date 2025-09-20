import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { LogoutResponseDTO } from '../interfaces/logoutRes.dto';
 
@Injectable({
  providedIn: 'root',
})
export class LogoutAdapter implements Adapter {
  constructor() {}
  adapt(data: LogoutResponseDTO): LogoutResponseDTO {
    return {
      message: data.message,
      error: data.error,
    };
  }
}
