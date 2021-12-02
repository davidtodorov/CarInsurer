import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/cars/car.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-events-create-edit-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.css']
})

export class CreateEditFormComponent implements OnInit, OnChanges {
  @ViewChild('firstName') firstNameInput!: ElementRef<HTMLElement>;
  @ViewChild('lastName') lastNameInput!: ElementRef<HTMLElement>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder, 
    private carService: CarService, 
    private eventService: EventService) {

  }

  @Input() currentEvent: any;

  id: string | undefined;
  isAddMode: boolean = false;

  eventForm = this.fb.group({
    car: [null, [Validators.required]],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    files: [null]
  });

  cars: any[] = [];
  carOptions: any[] = [];

  firstName = '';
  lastName = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

      this.carService.loadInsurances().subscribe(data => {
        this.cars = data;
        this.carOptions = data.map(x => {
          return { text: x.plateNumber, value: x._id };
        });
      });
  
      if (this.isAddMode) {
        this.eventForm.get('car')?.valueChanges.subscribe(carId => {
          let car = this.cars.find(x => x._id === carId);
          this.firstName = car.owner.firstName;
          this.lastName = car.owner.lastName;
        });
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const event = changes.currentEvent.currentValue
    if (event) {
      this.firstName = event.car.owner.firstName;
      this.lastName = event.car.owner.lastName;
      this.eventForm.patchValue({
        car: event.car._id,
        date: event.date,
        description: event.description
      });
    }
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
