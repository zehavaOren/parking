import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoListComponent } from '../demo/demo-list/demo-list.component';
import { DocumentsForEmployeeComponent } from './documents-for-employee/documents-for-employee.component';
import { EmployeeStatusesComponent } from './employee-statuses/employee-statuses.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { MoreEmployeeDataComponent } from './more-employee-data/more-employee-data.component';

const routes: Routes = [
  { path: 'aaa', component: MoreEmployeeDataComponent},
  { path: "demo-2", component: DemoListComponent },
  { path: "documentForEmployee", component: DocumentsForEmployeeComponent },
  { path: "employeeStatus", component: EmployeeStatusesComponent },
  { path: "historyData", component: HistoryDataComponent },
  // { path: "", component: DemoListComponent },
  { path: "", redirectTo: "documentForEmployee", pathMatch: "full" },
  // { path: "**", redirectTo: "", pathMatch: "full" },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreEmployeeDataRoutingModule { }



