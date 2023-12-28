import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EligibilityWaiveComponent } from './eligibility-waive/eligibility-waive.component';

const routes: Routes = [
  {
    path: "", component: EligibilityWaiveComponent, children: [
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EligibilityWaiveRoutingModule { }
