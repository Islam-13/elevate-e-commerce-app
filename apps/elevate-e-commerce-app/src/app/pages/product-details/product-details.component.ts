import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Product } from '@shared/interfaces/popular-items-interface/popular-items-interface';
import { PopularItemsService } from '@shared/services/popular-items/popular-items.service';
import { RelatedProductsComponent } from '../components/related-products/related-products.component';
import { CartService } from '@shared/services/cart/cart.service';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RelatedProductsComponent,MessageModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(PopularItemsService);
  private readonly _destroyRef = inject(DestroyRef);
    private readonly _CartService=inject(CartService);
  private readonly _toast = inject(MessageService);

    
  

  productDetails = signal<Product>({} as Product);
  productId = '';

  ngOnInit() {
    this._ActivatedRoute.paramMap
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          const id = res.get('id')!;
          this.productId = id;
          this.getProductDetails(id);
        },
      });
  }

  getProductDetails(id: string) {
    this._ProductService.getProductById(id)
      .pipe(takeUntilDestroyed(this._destroyRef)) 
      .subscribe({
        next: (res) => {
          this.productDetails.set(res.product);
          console.log(this.productDetails());
        },
      });
  }

  changeImage(image: string) {
    const current = this.productDetails();
    this.productDetails.set({ ...current, imgCover: image });
  }

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
}
