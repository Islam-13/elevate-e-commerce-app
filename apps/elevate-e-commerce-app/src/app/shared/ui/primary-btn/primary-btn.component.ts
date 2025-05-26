import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-primary-btn',
  imports: [CommonModule],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.css',
})
export class PrimaryBtnComponent {
  @Input({ required: true }) label = 'Default';
}
