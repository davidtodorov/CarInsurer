import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { CarService } from 'src/app/cars/car.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.css']
})

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class CreateEditFormComponent implements OnInit {
  @ViewChild('firstName') firstNameInput!: ElementRef<HTMLElement>;
  @ViewChild('lastName') lastNameInput!: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private carService: CarService, private eventService: EventService) {

  }

  eventForm = this.fb.group({
    car: [null, [Validators.required]],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    files: [null, [Validators.required]]
  });

  cars: any[] = [];
  carOptions: any[] = [];

  firstName = '';
  lastName = '';

  ngOnInit(): void {
    this.carService.loadInsurances().subscribe(data => {
      this.cars = data;
      this.carOptions = data.map(x => {
        return { text: x.plateNumber, value: x._id };
      });
    });

    this.eventForm.get('car')?.valueChanges.subscribe(carId => {
      let car = this.cars.find(x => x._id === carId);
      this.firstName = car.owner.firstName;
      this.lastName = car.owner.lastName;
    });
  }

  onSubmit(): void {
    let formData = new FormData();
    for (const file of this.eventForm.get('files')?.value) {
      formData.append('file', file);
    }
    for (const key in this.eventForm.value) {
      if (key !== 'files') {
        const element = this.eventForm.value[key];
        formData.append(key, element)
      }
    }
    this.eventService.createEvent(formData).subscribe();
  }

  uploadFiles(event: any) {
    let files = (event.target as HTMLInputElement).files;
    this.eventForm.patchValue({
      files: files
    })
  }


}
