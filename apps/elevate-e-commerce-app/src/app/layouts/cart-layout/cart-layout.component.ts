import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PrimaryBtnComponent } from '@shared/ui/primary-btn/primary-btn.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { InputTextModule } from 'primeng/inputtext';
import { CartService } from '@shared/services/cart/cart.service';
import {
  Cart,
  CartItem,
} from '@shared/interfaces/cart-interface/cart-interface';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/cart-data/cart.state';
import { Observable } from 'rxjs';
import {
  selectCart,
  selectQuantity,
  selectTotalPrice,
} from '../../store/cart-data/cart.selector';
import { getTotal, updateCount } from '../../store/cart-data/cart.actions';
import { BestSellerComponent } from '../../features/components/best-seller/best-seller.component';

@Component({
  selector: 'app-cart-layout',
  imports: [
    CommonModule,
    TranslateModule,
    PrimaryBtnComponent,
    BestSellerComponent,
    CartComponent,
    InputTextModule,
  ],
  templateUrl: './cart-layout.component.html',
  styleUrl: './cart-layout.component.css',
})
export class CartLayoutComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cart$!: Observable<Cart | null>;
  // cartData:CartInterface | null =null;

  quantity$!: Observable<CartItem[]>;
  totalPrice$!: Observable<number>;

  constructor(
    private _store: Store<{ total: CartState }>,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cart$ = this._store.select(selectCart);
    this.quantity$ = this._store.select(selectQuantity);
    this.totalPrice$ = this._store.select(selectTotalPrice);

    this._CartService.GetLoggedUserCart().subscribe((response) => {
      if (response && response.cart) {
        const cartData: Cart = {
          ...response.cart,
          numOfCartItems: response.numOfCartItems,
        };

        const items: CartItem[] = (response.cart.cartItems || []).map(
          (ci: any) => ({
            _id: ci.product._id,
            name: ci.product.title,
            image: ci.product.imgCover,
            category: ci.product.category,
            priceOfProduct: ci.product.price,
            count: ci.quantity,
            rateAvg: ci.product.rateAvg,
            rateCount: ci.product.rateCount,
            price: ci.product.price,
          })
        );

        this._store.dispatch(getTotal({ cartData }));
        this._store.dispatch(updateCount({ qun: items }));
      }
    });
  }

  onCkeckout() {
    console.log('test');
  }
}
