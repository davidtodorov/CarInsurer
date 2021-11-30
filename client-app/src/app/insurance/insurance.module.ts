import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent as InsuranceListComponent} from './list/list.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { CreateFormComponent } from './create-form/create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { InstallmentsModule } from '../installments/installments.module';
import { ListComponent as InstallmentsListComponent} from '../installments/list/list.component';
import { EventsModule } from '../events/events.module';

@NgModule({
  declarations: [
    InsuranceListComponent,
    CreateFormComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    InstallmentsModule,
    EventsModule
  ],
  exports: [
    InsuranceListComponent,
    CreateFormComponent,
    EditComponent,
    InstallmentsListComponent
  ]
})
export class InsuranceModule { }
