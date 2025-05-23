import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PrimaryBtnComponent } from "../../../shared/ui/primary-btn/primary-btn.component";

@Component({
  selector: 'app-special-gifts',
  imports: [CommonModule, CarouselModule, PrimaryBtnComponent],
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
    { id: 1, src: './images/special-gifts/Main-Background.jpg', alt: 'Main' },
    { id: 2, src: './images/special-gifts/Background1.jpg', alt: 'Image 1' },
    { id: 3, src: './images/special-gifts/Background2.jpg.jpg', alt: 'Image 2' },
    { id: 4, src: './images/special-gifts/Background3.jpg', alt: 'Image 3' },
    { id: 5, src: './images/special-gifts/Background4.jpg', alt: 'Image 4' },
    { id: 6, src: './images/special-gifts/Background5.jpg', alt: 'Image 5' },
    { id: 7, src: './images/special-gifts/Background6.jpg', alt: 'Image 6' },

  ];




  

}
