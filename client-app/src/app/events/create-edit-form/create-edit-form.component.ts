import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceService } from 'src/app/insurance/services/insurance.service';
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
    private insuranceService: InsuranceService,
    private eventService: EventService) {

  }

  @Input() currentEvent: any;

  id: string | undefined;
  isAddMode: boolean = false;

  eventForm = this.fb.group({
    insurance: [null, [Validators.required]],
    date: [null, [Validators.required]],
    description: [null, [Validators.required]],
    files: [null]
  });

  insurances: any[] = [];
  insuranceOptions: any[] = [];
  addedImages: any[] = [];
  fileNames: string[] = [];

  firstName = '';
  lastName = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.insuranceService.loadInsurances().subscribe(data => {
      this.insurances = data;
      this.insuranceOptions = data.map(x => {
        return { text: x.car.plateNumber, value: x._id };
      });
    });

    if (this.isAddMode) {
      this.eventForm.get('insurance')?.valueChanges.subscribe(id => {
        let insurance = this.insurances.find(x => x._id === id);
        this.firstName = insurance.car.owner.firstName;
        this.lastName = insurance.car.owner.lastName;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const event = changes.currentEvent.currentValue
    if (event) {
      this.firstName = event.insurance.car.owner.firstName;
      this.lastName = event.insurance.car.owner.lastName;
      this.eventForm.patchValue({
        insurance: event.insurance._id,
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
    let files = (event.target as HTMLInputElement).files as any;
    this.eventForm.patchValue({
      files: files
    });

    if (files && files.length > 0) {
      for (const file of files) {
        this.fileNames.push(file.name);

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.addedImages.push({ path: reader.result as string})
        };
      }
    }
  }

}
