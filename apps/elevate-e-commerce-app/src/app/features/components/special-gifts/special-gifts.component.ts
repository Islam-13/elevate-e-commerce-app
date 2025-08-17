import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimaryBtnComponent } from "@shared/ui/primary-btn/primary-btn.component";


@Component({
  selector: 'app-special-gifts',
  imports: [CommonModule, CarouselModule, TranslateModule, PrimaryBtnComponent],
  templateUrl: './special-gifts.component.html',
  styleUrl: './special-gifts.component.css',
})
export class SpecialGiftsComponent {



  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };
  // Image array
  imageSlides = [
    { id: 1, src: './images/special-gifts/MainBackground.jpg', alt: 'Main' },
    { id: 2, src: './images/special-gifts/Background2.jpg', alt: 'Image 1' },
    { id: 4, src: './images/special-gifts/Background3.jpg', alt: 'Image 3' },
    { id: 5, src: './images/special-gifts/Background6.jpg', alt: 'Image 4' },

  ];

  // Gifts array

   gifts = [
  {
    id: 1,
    src: './images/special-gifts/ConfettiLying.png',
    title: 'gifts.gift01Title',
    details: 'gifts.gift01Details',
    button_text: 'gifts.gift01Button',
    alt: 'gifts.gift01Alt'
  },
  {
    id: 2,
    src: './images/special-gifts/TopView.png',
    title: 'gifts.gift02Title',
    details: 'gifts.gift02Details',
    button_text: 'gifts.gift02Button',
    alt: 'gifts.gift02Alt'
  },
  {
    id: 3,
    src: './images/special-gifts/ChristmasShopping.png',
    title: 'gifts.gift03Title',
    details: 'gifts.gift03Details',
    button_text: 'gifts.gift03Button',
    alt: 'gifts.gift03Alt'
  }
];
}
