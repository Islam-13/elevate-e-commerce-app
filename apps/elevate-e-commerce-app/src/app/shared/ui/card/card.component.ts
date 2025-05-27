import { Component, input } from '@angular/core';

import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [StarRatingComponent, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  title = input.required<string>();
  imgCover = input.required<string>();
  price = input.required<number>();
  priceAfterDiscount = input.required<number>();
  rateAvg = input.required<number>();
}
