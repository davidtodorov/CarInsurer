import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CreateEditFormComponent } from './create-edit-form/create-edit-form.component';
import { DetailComponent } from './detail/detail.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    ListComponent,
    CreateEditFormComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    IvyCarouselModule
  ],
  exports: [
    CreateEditFormComponent,
    ListComponent,
    DetailComponent
  ]
})
export class EventsModule { }
