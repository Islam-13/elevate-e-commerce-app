import { Component, inject, input } from '@angular/core';

import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '@shared/services/cart/cart.service';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';


import { LocalStorageService } from '@shared/services/localStorage/local-storage.service';
import { getTotal, updateCount } from '../../../store/cart-data/cart.actions';
import { Store } from '@ngrx/store';
import { CartState } from '../../../store/cart-data/cart.state';
import { Cart, CartItem } from '@shared/interfaces/cart-interface/cart-interface';

@Component({
  selector: 'app-card',
  imports: [StarRatingComponent, CurrencyPipe,RouterLink,MessageModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly _CartService=inject(CartService);
private readonly _LocalStorageService=inject(LocalStorageService);
  private readonly _toast = inject(MessageService);

constructor( private _store: Store<{ total: CartState }>){}

  productId = input.required<string>();
  title = input.required<string>();
  imgCover = input.required<string>();
  price = input.required<number>();
  priceAfterDiscount = input.required<number>();
  rateAvg = input.required<number>();

  addToCart(p_id:string,qun:number){
      const payload = {
        product:p_id,
        quantity:qun
      }

      this._CartService.AddProductToCart(payload).subscribe({

        next:(res)=>{
          console.log(res);
          //next() to set value in behaviour subject
          this._CartService.cartCount.next(res.numOfCartItems);
          this.loadCart()
          
          this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Added Successfully to Cart',
      life: 4000,
    });
        
        },

        error:(err)=>{
          console.log(err);
          this._toast.add({
      severity: 'error',
      summary: 'Failure',
      detail: 'Sold Out',
      life: 4000,
    });

        }

      })
    }

    loadCart() {
        this._CartService.GetLoggedUserCart().subscribe((response) => {
          console.log('response:' , response);
          
          
          if (response?.cart && response.cart.cartItems.length > 0) {
             const cartData: Cart = {
              ...response.cart,
              numOfCartItems: response.numOfCartItems
            };
    
            const items: CartItem[] = response.cart.cartItems.map((ci: any) => ({
              id:ci._id,
              idProduct: ci.product._id,
      name: ci.product.title,
      image: ci.product.imgCover, 
      category: ci.product.category,
      priceOfProduct: ci.product.price,
      count: ci.quantity,
      rateAvg: ci.product.rateAvg,
      rateCount: ci.product.rateCount,
      price:ci.product.price
            }));
    
           this._store.dispatch(getTotal({ cartData }));
          this._store.dispatch(updateCount({ qun: items }));
          } else {
            // cart empty
            // this.clearCart();
          }
        });
      }
}
