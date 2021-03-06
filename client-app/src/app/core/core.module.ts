import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InsuranceModule } from '../insurance/insurance.module';
import { EventsModule } from '../events/events.module';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    InsuranceModule,
    EventsModule
  ],
  exports: [NavComponent]
})
export class CoreModule { }
