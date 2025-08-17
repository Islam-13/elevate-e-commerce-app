import { Component, input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-confirm-password-err',
  imports: [Message],
  templateUrl: './confirm-password-err.component.html',
  styleUrl: './confirm-password-err.component.css',
})
export class ConfirmPasswordErrComponent {
  form = input.required<FormGroup>();
  rePasswordCtrl = input.required<AbstractControl | null>();
}
