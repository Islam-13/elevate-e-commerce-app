import { Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularItemsService } from '../../../shared/services/popular-items/popular-items.service';
import { Product } from '../../../shared/interfaces/popular-items-interface/popular-items-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-items',
  imports: [CommonModule],
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.css',
})
export class PopularItemsComponent implements OnInit , OnDestroy {

  private readonly _popularItemsService = inject(PopularItemsService);
  products = signal<Product[]>([]);
  private subscription!: Subscription


  getAllProducts():void{
  this._popularItemsService.getAllProducts({
      limit: 10,
      sort: '-price'
    }).subscribe((data) => {
      this.products.set(data.products);
    });
  }

    ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }
}














