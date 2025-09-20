import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-unauthorized-page',
  imports: [CommonModule],
  templateUrl: './unauthorized-page.component.html',
  styleUrl: './unauthorized-page.component.css',
})
export class UnauthorizedPageComponent {
  goToHomePage() {}
}
