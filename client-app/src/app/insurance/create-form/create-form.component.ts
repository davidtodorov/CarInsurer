import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { plateNumberValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  constructor(private fb: FormBuilder, private insuranceService: InsuranceService, private snackBar: MatSnackBar) {
    this.setEndDate(this.startDate);
    this.createForm.get('insurance.startDate')?.valueChanges.subscribe((data) => {
      this.setEndDate(data);
    });

    this.createForm.get('insurance.cost')?.valueChanges.subscribe((cost) => {
      let installmentType = this.createForm.get('insurance.installmentType')?.value;
      if (installmentType) {
        this.setDueAmountValue(cost, installmentType)

      }
    });

    this.createForm.get('insurance.installmentType')?.valueChanges.subscribe((installmentType) => {
      let cost = this.createForm.get('insurance.cost')?.value;
      if (cost) {
        this.setDueAmountValue(cost, installmentType)
      }
    });
  }

  startDate = new Date();
  insuranceEndDate: any;

  installmentTypes = [
    {
      text: 'Yearly',
      value: 'Yearly',
    },
    {
      text: 'Half Yearly',
      value: 'HalfYearly',
    },
    {
      text: 'Quarterly',
      value: 'Quarterly',
    }
  ];

  createForm = this.fb.group({
    insurance: this.fb.group({
      startDate: [this.startDate, [Validators.required]],
      cost: [null, [Validators.required]],
      dueAmount: [null, [Validators.required]],
      installmentType: ['', [Validators.required]]
    }),
    car: this.fb.group({
      plateNumber: ['', [this.plateNumberValidator()]],
      productionDate: [null, [Validators.required]],
    }),
    owner: this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]]
    }),
  });

  private setEndDate(startDate: Date) {
    let newDate = moment(startDate).add(1, 'years').subtract(1, 'day').toDate();
    this.insuranceEndDate = newDate;
  }

  private setDueAmountValue(cost: number, installmentType: string) {
    let newAmount = 0;
    if (installmentType === 'Yearly') {
      newAmount = cost
    }
    else if (installmentType === 'HalfYearly') {
      newAmount = cost / 2;
    }
    else if (installmentType === 'Quarterly') {
      newAmount = cost / 4
    }
    this.createForm.get('insurance.dueAmount')?.setValue(newAmount);
  }

  onSubmit(): void {
    this.insuranceService.createInsurance(this.createForm.value).subscribe(data => {
      console.log(data);
    }, err => {
      this.showSnackbarTopPosition(err.error);
    });
  }

  plateNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = /^(E|A|B|BT|BH|BP|EB|TX|K|KH|OB|M|PA|PK|EH|PB|PP|P|CC|CH|CO|C|CA|CB|CT|T|X|H|Y)(\d{4})([A|B|E|K|M|H|O|P|C|T|Y|X]{2})$/.test(control.value);
      return isValid ? null : { pattern: { value: control.value } };
    };
  }

  private showSnackbarTopPosition(content:any) {
    this.snackBar.open(content, '', {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
