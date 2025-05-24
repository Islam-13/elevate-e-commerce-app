import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core'
@Component({
  selector: 'app-category-card',
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() image! : string;
  @Input() productsCount! : number;
  @Input() name! : string;

}


