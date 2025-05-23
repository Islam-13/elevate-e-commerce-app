import { Component } from '@angular/core';

@Component({
  selector: 'app-trusted-by',
  templateUrl: './trusted-by.component.html',
  styleUrl: './trusted-by.component.css',
})
export class TrustedByComponent {
  images = [
    { src: '/images/trustedBy/image 41.png' },
    { src: '/images/trustedBy/image 40.png' },
    { src: '/images/trustedBy/image 39.png' },
    { src: '/images/trustedBy/image 38.png' },
    { src: '/images/trustedBy/image 37.png' },
    { src: '/images/trustedBy/image 36.png' },
  ];

  settings = {
    '--numItems': this.images.length,
    '--width': '150px',
    '--height': '50px',
    '--speed': '20s',
    '--gap': '20px',
    '--single-slide-speed': 'calc(var(--speed) / var(--numItems))',
    '--track-width':
      'calc((var(--width) + var(--gap)) * (var(--numItems) - 1))',
  };
}
