import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-base-input',
  imports: [FormsModule],
  templateUrl: './base-input.component.html',
  styleUrl: './base-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputComponent),
      multi: true,
    },
  ],
})
export class BaseInputComponent implements ControlValueAccessor {
  /* ===== required API props ===== */
  label = input<string>('');
  type = input.required<'text' | 'email' | 'password' | 'tel'>();
  placeholder = input<string>(' ');

  /* ===== internal state (signals) ===== */
  value = signal<string>('');
  disabled = signal<boolean>(false);

  writeValue(v: string | null): void {
    this.value.set(v ?? '');
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onChange: (v: string) => void = () => {};
  onTouched: () => void = () => {};

  onInput(e: Event) {
    const text = (e.target as HTMLInputElement).value;
    this.onChange(text);
  }
}
