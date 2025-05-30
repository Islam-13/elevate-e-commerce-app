import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core'


@Component({
  selector: 'app-products-card',
  imports: [CommonModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css',
})
export class ProductsCardComponent {
  @Input() imgCover! : string;
  @Input() title! : string;
  @Input() rateAvg! : number;
  @Input() priceAfterDiscount! : number;
  @Input() price! : number;

}
