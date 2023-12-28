import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeSubscriptionsComponent } from './employee-subscriptions/employee-subscriptions.component';

const routes: Routes = [
  {
    path: "", component: EmployeeSubscriptionsComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSubscriptionsRoutingModule { }
