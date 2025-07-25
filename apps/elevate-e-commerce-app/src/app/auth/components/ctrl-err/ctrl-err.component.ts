import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-ctrl-err',
  imports: [MessageModule],
  templateUrl: './ctrl-err.component.html',
  styleUrl: './ctrl-err.component.css',
})
export class CtrlErrComponent {
  inputCtrl = input.required<AbstractControl<any, any> | null>();
  validation = input.required<string>();
  msg1 = input.required<string>();
  msg2 = input.required<string>();
}
