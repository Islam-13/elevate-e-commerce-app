import { Component, input } from '@angular/core';

@Component({
  selector: 'app-err-msg',

  templateUrl: './err-msg.component.html',
  styleUrl: './err-msg.component.css',
})
export class ErrMsgComponent {
  text = input.required<string>();
}
