import { Component, input } from '@angular/core';

import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [StarRatingComponent, CurrencyPipe,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  productId = input.required<string>();
  title = input.required<string>();
  imgCover = input.required<string>();
  price = input.required<number>();
  priceAfterDiscount = input.required<number>();
  rateAvg = input.required<number>();
}
