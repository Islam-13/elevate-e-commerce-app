import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import {
  RegisterAdapterRes,
  RegisterResponseDTO,
} from '../interfaces/registerRes.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthRegisterAdapterer implements Adapter {

  adapt(data: RegisterResponseDTO): RegisterAdapterRes {
    return {
      message: data.message,
      token: data.token,
      userEmail: data.user.email,
      error: data.error,
    };
  }
}
