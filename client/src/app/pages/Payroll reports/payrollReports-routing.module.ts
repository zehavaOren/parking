import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollReportsComponent } from './payroll-reports/payroll-reports.component';

const routes: Routes = [
  {
    path: "", component: PayrollReportsComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollReportsRoutingModule { }
