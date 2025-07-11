import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-base-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.css',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }  
  ],
})
export class BaseInputComponent {
  // Required inputs to use this component: control, type, placeholder
  type = input.required<'text' | 'email' | 'password' | 'number'>()
  formControlName = input.required<string>()
  placeholder = input.required<string>()
}