import { Component, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Message } from "primeng/message";

@Component({
  selector: 'app-form-error',
  imports: [CommonModule, Message],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css',
})
export class FormErrorComponent { 
   @Input({ required: true }) control!: AbstractControl | null;
  @Input() fieldName = '';

  errorMessage = computed(() => {
    if (!this.control || (!this.control.touched && !this.control.dirty)) return '';
   

    if (this.control.hasError('required')) {
      return `${this.fieldName} is required`;
    }

    if (this.control.hasError('min')) {
  const minValue = this.control.getError('min')?.min;
  return `${this.fieldName} must be at least ${minValue}`;
}

    if (this.control.hasError('max')) {
  const maxValue = this.control.getError('min')?.min;
  return `${this.fieldName} must not exceed ${maxValue}`;
}

   

    return '';
  });}
