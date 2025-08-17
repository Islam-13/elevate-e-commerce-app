import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function equalValues(v1: string, v2: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const a = form.get(v1)?.value;
    const b = form.get(v2)?.value;
    return a === b ? null : { misMatch: true };
  };
}