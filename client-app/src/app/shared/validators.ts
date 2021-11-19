import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function plateNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^(E|A|B|BT|BH|BP|EB|TX|K|KH|OB|M|PA|PK|EH|PB|PP|P|CC|CH|CO|C|CA|CB|CT|T|X|H|Y)(\d{4})([A|B|E|K|M|H|O|P|C|T|Y|X]{2})$/.test(control.value);
      return isValid ? null : { pattern: { value: control.value } };
    };
  }