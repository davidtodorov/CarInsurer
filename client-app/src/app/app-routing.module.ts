import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './insurance/create-form/create-form.component';
import { EditComponent } from './insurance/edit/edit.component';
import { ListComponent } from './insurance/list/list.component';
import  { ListComponent as EventListComponent } from './events/list/list.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/insurances'
  },
  {
    path: 'insurances',
    component: ListComponent
  },
  {
    path: 'insurances/create',
    component: CreateFormComponent
  },
  {
    path: 'insurances/:id',
    component: EditComponent
  },
  {
    path: 'events',
    component: EventListComponent
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })

export const AppRoutingModule = RouterModule.forRoot(routes);
