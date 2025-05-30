import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css',
})
export class FeaturesComponent {
features = [

{id:1,src:'./images/features/freeDeliveryIcon.png',alt:'Free Delivery',title:'Free Delivery',details:'Orders Over $120'},
{id:2,src:'./images/features/GetRefundIcon.png',alt:'Get Refund',title:'Get Refund',details:'Within 30 Days Returns'},
{id:3,src:'./images/features/SafePaymentIcon.png',alt:'Safe Payment',title:'Safe Payment',details:'100% Secure Payment'},
{id:4,src:'./images/features/SupportIcon.png',alt:'24/7 Support',title:'24/7 Support',details:'Feel Free To Call Us'},



]

}
