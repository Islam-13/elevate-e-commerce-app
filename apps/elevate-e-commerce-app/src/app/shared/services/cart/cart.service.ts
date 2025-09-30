import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { env } from '@env/env';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from '../localStorage/local-storage.service';

import { addProduct } from '@shared/interfaces/cart-interface/cart-interface';



@Injectable({
  providedIn: 'root'
})
export class CartService {

private readonly _LocalStorageService=inject(LocalStorageService);
private readonly _HttpClient=inject(HttpClient);


cartCount:BehaviorSubject<number> = new BehaviorSubject (0);


  GetLoggedUserCart():Observable<any>{
    return  this._HttpClient.get(`${env.baseURL}/cart`,{headers:{Authorization:`Bearer ${this._LocalStorageService.get("userToken")}`}})
  }



AddProductToCart(payload:addProduct):Observable<any>{

  return this._HttpClient.post(`${env.baseURL}/cart`,payload,{headers:{Authorization:`Bearer ${this._LocalStorageService.get("userToken")}`}})
}

RemoveSpecificCartItem(p_id:string):Observable<any>{
  return this._HttpClient.delete(`${env.baseURL}/cart/${p_id}`,{headers:{Authorization:`Bearer ${this._LocalStorageService.get("userToken")}`}})

}


UpdateCartProductQuantity(p_id:string,count:number):Observable<any>{
  return this._HttpClient.put(`${env.baseURL}/cart/${p_id}`,{"quantity":count},{headers:{Authorization:`Bearer ${this._LocalStorageService.get("userToken")}`}})
}

ClearUserCart():Observable<any>{

  return this._HttpClient.delete(`${env.baseURL}/cart`,{headers:{Authorization:`Bearer ${this._LocalStorageService.get("userToken")}`}})

}

}
