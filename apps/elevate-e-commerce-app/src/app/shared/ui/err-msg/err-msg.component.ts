import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-err-msg',
  imports: [CommonModule],
  templateUrl: './err-msg.component.html',
  styleUrl: './err-msg.component.css',
})
export class ErrMsgComponent {
  message = input.required<string>();
}
