// import { NgModule } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';


const routes: Routes = [
  {
    path: "", component: WaitingConfirmationComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AwaitingConfirmationRoutingModule { }

