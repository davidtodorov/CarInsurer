import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ListComponent
  ]
})
export class InstallmentsModule { }
