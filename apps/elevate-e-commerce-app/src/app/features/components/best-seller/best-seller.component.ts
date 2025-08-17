import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@shared/interfaces/best-seller';
import { CardComponent } from '@shared/ui/card/card.component';
import { ErrMsgComponent } from '@shared/ui/err-msg/err-msg.component';
import { LoaderComponent } from '@shared/ui/loader/loader.component';
import { BestSellerService } from '@shared/services/best-seller/best-seller.service';
import { PrimaryBtnComponent } from '@shared/ui/primary-btn/primary-btn.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css',
  imports: [
    TranslateModule,
    CarouselModule,
    ErrMsgComponent,
    CardComponent,
    PrimaryBtnComponent,
    LoaderComponent,
  ],
})
export class BestSellerComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 8,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      700: {
        items: 3,
      },
    },
    nav: true,
  };

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  private readonly _bestSeller = inject(BestSellerService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getBestSeller();
  }

  getBestSeller() {
    this.isLoading.set(true);
    this.error.set('');

    const subscrition = this._bestSeller.getBestSeller().subscribe({
      next: (res) => this.products.set(res),
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err);
      },
      complete: () => this.isLoading.set(false),
    });

    this._destroyRef.onDestroy(() => subscrition.unsubscribe());
  }
}
