import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import { ForgetPasswordAdapterRes } from '../interfaces/forgetPasswordRes.dto';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordAdapter implements Adapter {
  constructor() {}
  adapt(data: ForgetPasswordAdapterRes) {
    return{
      message:data.message,
      error:data.error?.message

    }
  }
}
