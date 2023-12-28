import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingParkingComponent } from './waiting-parking/waiting-parking.component';


const routes: Routes = [
  {
    path: "", component: WaitingParkingComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaitingParkingRoutingModule { }