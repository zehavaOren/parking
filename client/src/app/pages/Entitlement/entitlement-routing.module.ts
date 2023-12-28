import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitlementComponent } from './entitlement/entitlement.component';

const routes: Routes = [
  {
    path: "", component: EntitlementComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitlementRoutingModule { }
