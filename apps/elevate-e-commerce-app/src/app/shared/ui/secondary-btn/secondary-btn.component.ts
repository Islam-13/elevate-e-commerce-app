import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-secondary-btn',
  imports: [CommonModule],
  templateUrl: './secondary-btn.component.html',
  styleUrl: './secondary-btn.component.css',
})
export class SecondaryBtnComponent {
  @Input() label='Default'
}
