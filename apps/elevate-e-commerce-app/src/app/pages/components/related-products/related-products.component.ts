import {
  Component,
  DestroyRef,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelatedProduct } from '@shared/interfaces/related-products-interface/related-products-interface';
import { RelatedProductsService } from '@shared/services/related-products/related-products.service';
import { LoaderComponent } from "@shared/ui/loader/loader.component";
import { ErrMsgComponent } from "@shared/ui/err-msg/err-msg.component";
import { CardComponent } from "@shared/ui/card/card.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    ErrMsgComponent,
    CardComponent,
    TranslateModule
  ],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent implements OnInit {

  @Input() productId!: string;
  allShown = false;
  noData: WritableSignal<boolean> = signal(false);

  relatedProducts = signal<RelatedProduct[]>([]);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  private readonly _relatedProductsService = inject(RelatedProductsService);
  private readonly _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadRelatedProducts();
  }

  loadRelatedProducts(showAll = false) {
    this.isLoading.set(true);
    this.error.set('');

    if (!this.productId) {
      this.error.set('No product ID provided!');
      this.isLoading.set(false);
      return;
    }

    const subscription = this._relatedProductsService.getRelatedProducts(this.productId).subscribe({
      next: (res) => {
        const products = showAll ? res : res.slice(0, 4);
        this.relatedProducts.set(products);
        this.allShown = showAll;
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set(err);
      },
      complete: () => this.isLoading.set(false),
    });

    this._destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  products() {
    return this.relatedProducts();
  }
}
