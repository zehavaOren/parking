import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersComponent } from './subscribers/subscribers.component';

const routes: Routes = [
  {
    path: "", component: SubscribersComponent, children: [
    // { path: '/EmployeeSubscription', component: EmployeeSubscriptionDetailsComponent },
    ]
  },
  // {path: '/EmployeeSubscription', component: EmployeeSubscriptionDetailsComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribersRoutingModule { }
