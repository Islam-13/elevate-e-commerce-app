import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shared/interfaces/popular-items-interface/popular-items-interface';
import { PopularItemsService } from '@shared/services/popular-items/popular-items.service';
import { RelatedProductsComponent } from '../components/related-products/related-products.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RelatedProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(PopularItemsService);

  productDetails = signal<Product>({} as Product);
  productId = '';

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        const id = res.get('id')!;
        this.productId = id;
        this.getProductDetails(id);
      },
    });
  }

  getProductDetails(id: string) {
    this._ProductService.getProductById(id).subscribe({
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
}
