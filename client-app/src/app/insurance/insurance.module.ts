import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ListComponent,
    CreateFormComponent
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
