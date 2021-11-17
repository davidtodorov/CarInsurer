import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  constructor(private fb: FormBuilder) {
    this.setEndDate(this.startDate);
    this.createForm.get('insurance.startDate')?.valueChanges.subscribe((data) => {
      this.setEndDate(data);
    });

    this.createForm.get('insurance.cost')?.valueChanges.subscribe((costValue) => {
      let installmentTypeValue = this.createForm.get('insurance.installmentType')?.value;
      if (installmentTypeValue) {
        if (installmentTypeValue === 'Yearly') {
          this.setDueAmountValue(costValue);
        } 
        else if ( installmentTypeValue === 'HalfYearly') {
          this.setDueAmountValue(costValue/2);
        }
        else if ( installmentTypeValue === 'Quarterly') {
          this.setDueAmountValue(costValue/4);
        }

      }
      console.log('dirty: ', this.createForm.get('insurance.dueAmount')?.dirty);
      console.log('touched: ', this.createForm.get('insurance.dueAmount')?.touched);
    })
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
      plateNumber: ['', [Validators.required]],
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

  private setDueAmountValue(costValue: number) {
    this.createForm.get('insurance.dueAmount')?.setValue(costValue);
  }

  onSubmit(): void {
    alert('Thanks!');
  }
}
