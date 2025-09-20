import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import {
  ResetPasswordAdapterRes,
  ResetPasswordResponseDTO,
} from '../interfaces/resetPasswordRes.dto';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordAdapter implements Adapter {
  constructor() {}

  adapt(data: ResetPasswordResponseDTO){
    return {
      message: data.message,
      token: data.token,
      error: data.error?.message,
    };
  }
}
