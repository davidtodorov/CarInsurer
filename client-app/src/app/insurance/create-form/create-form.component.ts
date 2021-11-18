import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {
  constructor(private fb: FormBuilder, private insuranceService: InsuranceService) {
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
    });
  }
}
