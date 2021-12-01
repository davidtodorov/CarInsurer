import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { CreateEditFormComponent } from './create-edit-form/create-edit-form.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateEditFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CreateEditFormComponent,
    ListComponent
  ]
})
export class EventsModule { }
