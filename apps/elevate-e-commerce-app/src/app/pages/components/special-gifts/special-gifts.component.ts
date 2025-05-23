import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PrimaryBtnComponent } from "../../../shared/ui/primary-btn/primary-btn.component";
import { SecondaryBtnComponent } from "../../../shared/ui/secondary-btn/secondary-btn.component";

@Component({
  selector: 'app-special-gifts',
  imports: [CommonModule, CarouselModule, PrimaryBtnComponent, SecondaryBtnComponent],
  templateUrl: './special-gifts.component.html',
  styleUrl: './special-gifts.component.css',
})
export class SpecialGiftsComponent {

mainSliderOptions: OwlOptions = {
   loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay:true,
    autoplayTimeout:2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      
    },
    nav: true
  }
   // Image array
  imageSlides = [
    { id: 1, src: './images/special-gifts/MainBackground.jpg', alt: 'Main' },
    { id: 2, src: './images/special-gifts/Background1.jpg', alt: 'Image 1' },
    { id: 3, src: './images/special-gifts/Background2.jpg.jpg', alt: 'Image 2' },
    { id: 4, src: './images/special-gifts/Background3.jpg', alt: 'Image 3' },
    { id: 5, src: './images/special-gifts/Background4.jpg', alt: 'Image 4' },
    { id: 6, src: './images/special-gifts/Background5.jpg', alt: 'Image 5' },
    { id: 7, src: './images/special-gifts/Background6.jpg', alt: 'Image 6' },

  ];

  // Gifts array


gifts = [
    { id: 1, src: './images/special-gifts/ConfettiLying.png',details:'Awesome Gifts Box Collectons',title:'Gifts Box', button_text:'Shop Now' },
    { id: 2, src: './images/special-gifts/TopView.png', alt: 'occasion-gifts-1',title:'Occasion Gifts',details:'Best Occasion Gifts Collections',button_text:'Discover Now' },
    { id: 3, src: './images/special-gifts/ChristmasShopping.png', alt: 'occasion-gifts-2',title:'Occasion Gifts',details:'Combo Sets Gift Box Up To 50% Off',button_text:'Discover Now' },
    

  ];
  

}
