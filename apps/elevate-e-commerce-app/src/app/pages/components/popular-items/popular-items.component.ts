import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularItemsService } from '../../../shared/services/popular-items/popular-items.service';
import { PopularItemsInterface } from '../../../shared/interfaces/popular-items-interface/popular-items-interface';

@Component({
  selector: 'app-popular-items',
  imports: [CommonModule],
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.css',
})
export class PopularItemsComponent implements OnInit {

  private readonly _popularItemsService = inject(PopularItemsService);
  products: WritableSignal<PopularItemsInterface> = signal ({} as PopularItemsInterface);


getAllProducts(): void {
  this._popularItemsService.getAllProducts().subscribe({
    next:(res)=>{
        console.log(res);
        this.products.set(res);
    }
    },)
  };
    ngOnInit(): void {
      this.getAllProducts();
  }


}


