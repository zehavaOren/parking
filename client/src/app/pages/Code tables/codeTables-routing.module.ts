import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeTablesComponent } from './code-tables/code-tables.component';

const routes: Routes = [
  {
    path: "", component: CodeTablesComponent, children: [
    
    ]
  },

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeTablesRoutingModule { }
