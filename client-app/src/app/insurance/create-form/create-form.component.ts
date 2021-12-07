import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { InsuranceService } from '../services/insurance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { map, startWith } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { IUser } from 'src/app/user/models/IUser';
import IInsuranceForm from '../models/IInsuranceForm';
import { MatSnackBarService } from 'src/app/shared/services/mat-snack-bar.service';
import { plateNumberValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-insurance-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {
  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private insuranceService: InsuranceService,
    private userService: UserService,
    private snackBarService: MatSnackBarService) {

    this.setEndDate(this.startDate);
  }

  id: string | undefined;
  isAddMode: boolean = false;
  startDate = new Date();
  insuranceEndDate: Date | undefined;

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

  users: IUser[] = [];
  currentInsurance: IInsuranceForm | undefined;
  userIdentityNumberOptions: Number[] = [];
  userIdentityNumberFilteredOptions: Observable<any> | undefined;

  createForm!: FormGroup;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.addForm();
    this.addFormFieldHandlers();

    if (this.isAddMode) {
      this.loadUsers();
    } else {
      this.loadInsurance();
    }
  }

  onSubmit(): void {
    this.isAddMode ? this.createInsurance() : this.updateInsurance();
  }

  onIdentityNumberBlur(event: FocusEvent) {
    const value = this.createForm.get('owner.identityNumber')?.value
    if (value && this.userIdentityNumberOptions.some(x => x === value)) {
      let user = this.users?.find(x => x.identityNumber === value);
      this.disableControlAndSetValue(this.createForm.get('owner.firstName'), user?.firstName)
      this.disableControlAndSetValue(this.createForm.get('owner.lastName'), user?.lastName)
    } else {
      this.createForm.get('owner.firstName')?.enable();
      this.createForm.get('owner.lastName')?.enable();
    }
  }

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

  private addFormFieldHandlers() {
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
  };

  private filter(value: string): Number[] {
    const filterValue = value;

    return this.userIdentityNumberOptions.filter(option => option.toString().includes(filterValue));
  }

  private disableControlAndSetValue(control: AbstractControl | null, value: String | undefined) {
    control?.disable();
    control?.setValue(value);
  }

  private loadUsers() {
    this.userService.loadUsers().subscribe(users => {
      this.users = users;
      this.userIdentityNumberOptions = users.map(x => x.identityNumber);
      this.userIdentityNumberFilteredOptions = this.createForm.get('owner.identityNumber')?.valueChanges.pipe(
        startWith(''),
        map((value) => this.filter(value))
      );
    });
  }

  private loadInsurance() {
    this.insuranceService.loadInsurances(this.id).subscribe(insurances => {
      let insurance = insurances[0];
      let owner = insurance.car.owner;
      let car = insurance.car;
      this.createForm.patchValue({
        owner,
        car,
        insurance
      })
    });
  }

  private addForm() {
    this.createForm = this.fb.group({
      insurance: this.fb.group({
        startDate: [{ value: this.startDate, disabled: !this.isAddMode }, [Validators.required]],
        cost: [{ value: null, disabled: !this.isAddMode }, [Validators.required]],
        dueAmount: [{ value: null, disabled: true }, [Validators.required]],
        installmentType: [{ value: '', disabled: !this.isAddMode }, [Validators.required]]
      }),
      car: this.fb.group({
        plateNumber: [{ value: '', disabled: !this.isAddMode }, [plateNumberValidator()]],
        productionDate: [{ value: '', disabled: !this.isAddMode }, [Validators.required]],
      }),
      owner: this.fb.group({
        firstName: [{ value: '', disabled: !this.isAddMode }, [Validators.required]],
        lastName: [{ value: '', disabled: !this.isAddMode }, [Validators.required]],
        identityNumber: [{ value: '', disabled: !this.isAddMode }, [Validators.required]]
      }),
    });
  }

  private createInsurance() {
    this.insuranceService.createInsurance(this.createForm.value).subscribe(data => {
      this.router.navigate([''])
    }, err => {
      this.snackBarService.open(err.error);
    });
  }

  private updateInsurance() {
    this.insuranceService.updateInsurance(this.createForm.value).subscribe(() => {
      this.snackBarService.open("Updated Successfully!")
    }, err => {
      this.snackBarService.open(err.error);
    })
  }

}

