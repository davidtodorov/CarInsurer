import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './insurance/create-form/create-form.component';
import { ListComponent } from './insurance/list/list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent
  },
  {
    path: 'insurances/create',
    component: CreateFormComponent
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

export const AppRoutingModule = RouterModule.forRoot(routes);
