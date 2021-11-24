import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ListComponent,
    CreateFormComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent,
    CreateFormComponent,
    EditComponent
  ]
})
export class InsuranceModule { }
