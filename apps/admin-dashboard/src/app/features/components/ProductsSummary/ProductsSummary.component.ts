import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowStockItem, TopSellingItem } from '../../interfaces/products/products';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsService } from '../../services/overviews/products/products.service';

@Component({
  selector: 'app-products-summary',
  imports: [CommonModule],
  templateUrl: './ProductsSummary.component.html',
  styleUrl: './ProductsSummary.component.css',
})
export class ProductsSummaryComponent implements OnInit {


  // Create Variables
  topSelling: TopSellingItem[] = [];
  lowStock: LowStockItem[] = [];
  rowClasses = [
  'bg-gradient-to-r from-[rgba(223,172,22,0.25)] to-[rgba(223,172,22,0.1)]',
  'bg-gradient-to-r from-[rgba(117,127,149,0.25)] to-[rgba(117,127,149,0.1)]',
  'bg-gradient-to-r from-[rgba(145,68,0,0.25)] to-[rgba(145,68,0,0.1)]',
];

  // Call Services
  private readonly _productsService = inject(ProductsService)
  private readonly destroyRef = inject(DestroyRef)


  ngOnInit(): void {
    this.getAllLowStock();
    this.getAllTopSelling();
  }



  getAllTopSelling(): void {
    this._productsService.getTopSelling()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.topSelling = res;
        console.log(this.topSelling);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  getAllLowStock(): void {
    this._productsService.getLowStock()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (res) => {
        this.lowStock = res;
        console.log(this.lowStock);

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
