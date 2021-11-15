import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CreateFormComponent } from './create-form/create-form.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    ListComponent,
    CreateFormComponent
  ]
})
export class InsuranceModule { }
