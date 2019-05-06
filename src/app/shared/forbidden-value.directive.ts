import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenValueValidator(forbiddenValue): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = forbiddenValue.toString() === control.value.toString();
    return forbidden ? {'forbiddenValue': {value: control.value}} : null;
  };
}
