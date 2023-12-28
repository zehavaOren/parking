import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreEmployeeDataComponent } from '../more-employee-data/more-employee-data/more-employee-data.component';
import { EmployeeSubscriptionDetailsComponent } from './employee-subscription-details/employee-subscription-details.component';

const routes: Routes = [
  {
    path: "", component: EmployeeSubscriptionDetailsComponent,
    children: [
      {
        path: '', loadChildren: () => import('../../modules/more-employee-data/more-employee-data.module')
          .then(m => m.MoreEmployeeDataModule)
      },
      // { path: "", component: MoreEmployeeDataComponent }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSubscriptionDetailsRoutingModule { }
