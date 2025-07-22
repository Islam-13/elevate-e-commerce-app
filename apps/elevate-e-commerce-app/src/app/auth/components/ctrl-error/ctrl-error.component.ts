import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ctrl-error',
  imports: [CommonModule],
  templateUrl: './ctrl-error.component.html',
  styleUrl: './ctrl-error.component.css',
})
export class CtrlErrorComponent {
  text = input.required<string>();
}
