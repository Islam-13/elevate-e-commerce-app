// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-gallery',
//   imports: [CommonModule],
//   templateUrl: './gallery.component.html',
//   styleUrl: './gallery.component.css',
// })
// export class GalleryComponent {}
import { Component } from '@angular/core';

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  images: string[] = [
    './images/gallery/gallery1.png',
     './images/gallery/gallery2.png',
     './images/gallery/gallery3.jpg',
     './images/gallery/gallery4.png',
    './images/gallery/gallery5.png'
  ];
}
