import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatesAndAlertsComponent } from './updates-and-alerts/updates-and-alerts.component';


const routes: Routes = [
  {
    path: "", component: UpdatesAndAlertsComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatesAndAlertsRoutingModule { }
