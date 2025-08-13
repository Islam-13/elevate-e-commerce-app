import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '@shared/services/cart/cart.service';
import { Cart, CartInterface, CartItem, Product } from '@shared/interfaces/cart-interface/cart-interface';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryBtnComponent } from "@shared/ui/primary-btn/primary-btn.component";
import { Observable, Subscription } from 'rxjs';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { SecondaryBtnComponent } from "@shared/ui/secondary-btn/secondary-btn.component";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BestSellerComponent } from "../components/best-seller/best-seller.component";
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart-data/cart.state';
import { selectCart, selectNumOfCartItems, selectQuantity, selectTotalPrice } from '../../store/cart-data/cart.selector';
import { ApplyData, changeItemQuantity, ClearCart, getTotal, removeItem, updateCount } from '../../store/cart-data/cart.actions';


@Component({
  selector: 'app-cart',
  imports: [CommonModule, TranslateModule, MessageModule, InputTextModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {



private readonly _CartService=inject(CartService);
  private readonly _toast = inject(MessageService);

  cart$!: Observable<Cart | null>;
  quantity$!: Observable<CartItem[]>;
  cartData:CartInterface | null =null;
  cartQuantitySub!: Subscription;
  cartNumber: WritableSignal<number> = signal(0);
    cartItems = signal<Product[]>([]);
     totalPrice$!: Observable<number>;
     numOfCartItems$!: Observable<number>;
     
  

constructor( private _store: Store<{ total: CartState }>){}

ngOnInit(): void {
     this.cart$ = this._store.select(selectCart);
    this.quantity$ = this._store.select(selectQuantity);
    this.totalPrice$ = this._store.select(selectTotalPrice);
     this.numOfCartItems$ = this._store.select(selectNumOfCartItems);

//     this._CartService.GetLoggedUserCart().subscribe((response) => {
//       console.log('Full API response:', response);

//       if(response?.cart && response.cart.cartItems.length > 0){
//         const cartItemsFromApi = response.cart.cartItems || [];
//         console.log('Cart Items from API:', cartItemsFromApi);

//         if (cartItemsFromApi.length > 0) {
//           console.log('First Product from API:', cartItemsFromApi[0].product);
//         }

//         const cartData: Cart = {
//           ...response.cart,
//           numOfCartItems: response.numOfCartItems
//         };

//         const items: CartItem[] = (response.cart.cartItems || []).map((ci: any) => ({
//     id:ci._id,
//           idProduct: ci.product._id,
//   name: ci.product.title,
//   image: ci.product.imgCover, 
//   category: ci.product.category,
//   priceOfProduct: ci.product.price,
//   count: ci.quantity,
//   rateAvg: ci.product.rateAvg,
//   rateCount: ci.product.rateCount,
//   price:ci.product.price
  
// }));

//         console.log('Mapped Items for store:', items);

//         this._store.dispatch(getTotal({ cartData }));
//         this._store.dispatch(updateCount({ qun: items }));
//         // this._store.dispatch(ApplyData());
//       }
//     });
 this.loadCart()
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
        this.clearCart();
      }
    });
  }
 



  changeQuantity(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
  const newCount = Number(input.value);
    this._store.dispatch(changeItemQuantity({ id: item.product._id, count: newCount }));
    this.cartQuantitySub= this._CartService.UpdateCartProductQuantity(item.product._id,newCount).subscribe({
      next:(res)=>{
        if (res.message === "success") {
          this.cartData = res;
           this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'product quantity changed',
      life: 4000,
    });
        }

      },

    })
    this._store.dispatch(ApplyData());
  }

GetLoggedUserCart(){
 this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res);
        this.cartData=res;


      }

    })
}


updateCount(p_id:string, count:number){
    this._store.dispatch(changeItemQuantity({ id: p_id, count: count }));

   this.cartQuantitySub= this._CartService.UpdateCartProductQuantity(p_id,count).subscribe({
      next:(res)=>{
        if (res.message === "success") {
          this.cartData = res;
           this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'product quantity changed',
      life: 4000,
    });
        }

      },

    })

  }

//  updateItemCount(id: string, newCount: number): CartItem[] {
//   let updatedItems: CartItem[] = [];
//   this.quantity$.subscribe((items) => {
//     updatedItems = items.map((i) =>
//       i.id === id ? { ...i, count: newCount } : i
//     );
//   }).unsubscribe();
//   return updatedItems;
// }

  // removeProduct(id: string) {
  //   this._store.dispatch(removeItem({ id }));
  //   this._store.dispatch(ApplyData());
  // }


// clearCart() {
//     this._store.dispatch(ClearCart());
//   }






// clearCart(){
//   this._store.dispatch(ClearCart());
//   this._CartService.ClearUserCart().subscribe({
//     next:(res)=>{
//           console.log(res);
   
//           if (res.message === "success") {
//                 this._toast.add({
//       severity: 'success',
//       summary: 'Success',
//       detail: 'All products cleared',
//       life: 4000,
//     });
         
//           this.cartData = {numOfCartItems:0} as CartInterface;
//           this._CartService.cartCount.next(res.numOfCartItems);

//         }


    
    
//       }
//   })
// }


clearCart() {
  this._CartService.ClearUserCart().subscribe({
    next: () => {
      // console.log('✅ الكارت اتفضى', res);

      // تحديث store ببيانات فاضية
     const emptyCart: Cart = {
  _id: '',
  user: '',
  cartItems: [],
  appliedCoupons: [],
  totalPrice: 0,
  createdAt: '',
  updatedAt: '',
  numOfCartItems: 0, // ✅ علشان يظهر 0 في الـ header
  __v: 0 // ✅ إضافة الحقل المطلوب
};

      this._store.dispatch(getTotal({ cartData: emptyCart }));
      this._store.dispatch(updateCount({ qun: [] }));
    },
    error: (err) => console.error('❌ خطأ في مسح الكارت', err)
  });
}



// increaseQuantity(item: CartItem) {
//   const newCount = item.count + 1;

//   // تحديث الـ store مباشرة
//   this._store.dispatch(changeItemQuantity({ id: item.id, count: newCount }));

//   // تحديث السيرفر
//   this._CartService.UpdateCartProductQuantity(item.idProduct, item.count).subscribe({
//       next:(res)=>{
//         if (res.message === "success") {
//           this.cartData = res;
//            this._toast.add({
//       severity: 'success',
//       summary: 'Success',
//       detail: 'product quantity changed',
//       life: 4000,
//     });
//         }
//              if (res?.cart) {
//         const updatedItems: CartItem[] = res.cart.cartItems.map((ci: any) => ({
//           id:ci._id,
//           idProduct: ci.product._id,
//           name: ci.product.title,
//           image: ci.product.imgCover,
//           category: ci.product.category,
//           price: ci.product.price,
//           count: ci.quantity
//         }));

//         this._store.dispatch(getTotal({ cartData: res.cart }));
//         this._store.dispatch(updateCount({ qun: updatedItems }));
//       }
//     },
//     error: (err) => console.error('خطأ عند زيادة الكمية', err)
//   });

      
   
// }
increaseQuantity(item: CartItem) {
  const newCount = item.count + 1;
  
  this._CartService.UpdateCartProductQuantity(item.idProduct, newCount).subscribe({
    next: (res) => {
      console.log('✅ الكمية اتعدلت على السيرفر', res);

      if (res?.cart) {
        const updatedItems: CartItem[] = res.cart.cartItems.map((ci: any) => ({
         id:ci._id,
          idProduct: ci.product._id,
          name: ci.product.title,
          image: ci.product.imgCover,
          category: ci.product.category,
          price: ci.product.price,
          count: ci.quantity
        }));

        this._store.dispatch(getTotal({ cartData: res.cart }));
        this._store.dispatch(updateCount({ qun: updatedItems }));
      }
       if (res.message === "success") {
          this.cartData = res;
           this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'product quantity changed',
      life: 4000,
    });
        }
    },
    error: (err) => console.error('❌ خطأ في تعديل الكمية', err)
  });
}


// decreaseQuantity(item: CartItem) {
//   if (item.count > 1) {
//     const newCount = item.count - 1;

//     // تحديث الـ store مباشرة
//     this._store.dispatch(changeItemQuantity({ id: item.id, count: newCount }));

//     // تحديث السيرفر
//     this._CartService.UpdateCartProductQuantity(item.product._id, newCount).subscribe({
//        next:(res)=>{
//         if (res.message === "success") {
//           this.cartData = res;
//            this._toast.add({
//       severity: 'success',
//       summary: 'Success',
//       detail: 'product quantity changed',
//       life: 4000,
//     });
//         }

//       },
//       error: (err) => console.error('خطأ عند تقليل الكمية', err)
//     });
//   }
// }
  decreaseQuantity(item: CartItem) {
    if (item.count > 1) {
      const newCount = item.count - 1;

      this._CartService.UpdateCartProductQuantity(item.idProduct, newCount).subscribe({
        next: (res) => {
          if (res?.cart) {
            const updatedItems: CartItem[] = res.cart.cartItems.map((ci: any) => ({
            id:ci._id,
          idProduct: ci.product._id,
          name: ci.product.title,
          image: ci.product.imgCover,
          category: ci.product.category,
          price: ci.product.price,
          count: ci.quantity
            }));

            this._store.dispatch(getTotal({ cartData: res.cart }));
            this._store.dispatch(updateCount({ qun: updatedItems }));
          }
           if (res.message === "success") {
          this.cartData = res;
           this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'product quantity changed',
      life: 4000,
    });
        }
        },
        error: (err) => console.error('خطأ في تقليل الكمية', err)
      });
    }
  }

removeProduct(item: CartItem) {
    this._CartService.RemoveSpecificCartItem(item.idProduct).subscribe({
      next: (res) => {
        if (res?.cart) {
          const updatedItems: CartItem[] = res.cart.cartItems.map((ci: any) => ({
           id:ci._id,
          idProduct: ci.product._id,
          name: ci.product.title,
          image: ci.product.imgCover,
          category: ci.product.category,
          price: ci.product.price,
          count: ci.quantity
          }));

          this._store.dispatch(getTotal({ cartData: res.cart }));
          this._store.dispatch(updateCount({ qun: updatedItems }));
          this.loadCart()
        } else {
          this._store.dispatch(getTotal({ cartData: { cartItems: [], totalPrice: 0 } as any }));
          this._store.dispatch(updateCount({ qun: [] }));
        }
          if (res.message === "success") {
                this._toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'All products cleared',
      life: 4000,
    });
         
          this.cartData = {numOfCartItems:0} as CartInterface;
          this._CartService.cartCount.next(res.numOfCartItems);

        }
      },
      error: (err) => console.error('خطأ في حذف المنتج', err)
    });
  }

}
