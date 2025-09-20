import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { VerifyCodeAdapterRes, VerifyCodeResponseDTO } from '../interfaces/verifuCodeRes.dto';

@Injectable({
  providedIn: 'root',
})
export class VerifyCodeAdapter implements Adapter {
  constructor() {}
  adapt(data: VerifyCodeResponseDTO):VerifyCodeAdapterRes {
    return {
      message: data.status,
      error: data.error,
    };
  }
}
