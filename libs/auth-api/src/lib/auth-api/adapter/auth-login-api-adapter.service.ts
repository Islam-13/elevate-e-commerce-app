import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { LoginAdapterRes, LoginResponseDTO } from '../interfaces/loginRes.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginApiAdapter implements Adapter {
  adapt(data: LoginResponseDTO): LoginAdapterRes {
    return {
      message: data.message,
      token: data.token,
      user: data.user,
      error: data.error,
    };
  }
}
