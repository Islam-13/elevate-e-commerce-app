import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-features',
  imports: [CommonModule,TranslateModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent {

features = [
  {
    id: 1,
    src: './images/features/freeDeliveryIcon.png',
    alt: 'Free Delivery',
    title: 'home.feature01',
    details: 'home.feature01Details'
  },
  {
    id: 2,
    src: './images/features/GetRefundIcon.png',
    alt: 'Get Refund',
    title: 'home.feature02',
    details: 'home.feature02Details'
  },
  {
    id: 3,
    src: './images/features/SafePaymentIcon.png',
    alt: 'Safe Payment',
    title: 'home.feature03',
    details: 'home.feature03Details'
  },
  {
    id: 4,
    src: './images/features/SupportIcon.png',
    alt: '24/7 Support',
    title: 'home.feature04',
    details: 'home.feature04Details'
  }
];

}
