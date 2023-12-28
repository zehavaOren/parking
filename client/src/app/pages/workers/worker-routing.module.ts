import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkerComponent } from './worker/worker.component';

const routes: Routes = [
  {
    path: "", component: WorkerComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkerRoutingModule { }
