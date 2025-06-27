import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Product } from '@shared/interfaces/popular-items-interface/popular-items-interface';
import { PopularItemsService } from '@shared/services/popular-items/popular-items.service';
import { Subscription } from 'rxjs';
import { CardComponent } from "../../shared/ui/card/card.component";
import { FormsModule } from '@angular/forms';
  

 


@Component({
  selector: 'app-allproducts',
  imports: [CardComponent,FormsModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent implements OnInit, OnDestroy {


  
  private readonly _popularItemsService = inject(PopularItemsService);
 
  allProducts = signal<Product[]>([]);
   private subscription!: Subscription;
     selectedSortOption: string = 'priceAsc';


   ngOnInit(): void {
    this.getAllProducts();
       
   }

 getAllProducts(): void {
    this.subscription = this._popularItemsService.getAllProducts({
       sort: 'priceAfterDiscount'
    }).subscribe((data) => {
       
      this.allProducts.set(data.products);
       console.log('All Products:', this.allProducts());
           
     });
  }

  sortProducts(option: string): void {
if (option === 'priceAsc') {
      this.allProducts.set([...this.allProducts()].sort((a, b) => a.priceAfterDiscount - b.priceAfterDiscount));
    } else if (option === 'priceDesc') {
      this.allProducts.set([...this.allProducts()].sort((a, b) => b.priceAfterDiscount - a.priceAfterDiscount));
    }
  }

   ngOnDestroy(): void {
    if (this.subscription) {

      this.subscription.unsubscribe();
    }
  }
}
