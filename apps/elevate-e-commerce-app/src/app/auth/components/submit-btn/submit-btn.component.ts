import { Component, input } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  imports: [],
  templateUrl: './submit-btn.component.html',
  styleUrl: './submit-btn.component.css',
})
export class SubmitBtnComponent {
  isSubmitting = input.required<boolean>();
  label = input.required<string>();
}
