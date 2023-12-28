import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoListComponent } from 'src/app/modules/demo/demo-list/demo-list.component';
import { Demo2Component } from 'src/app/modules/demo/demo2/demo2.component';
import { MoreEmployeeDataComponent } from 'src/app/modules/more-employee-data/more-employee-data/more-employee-data.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
const routes: Routes = [
  {
    path: "demo-page", component: DemoPageComponent, children: [
      { path: "demo-component", component: DemoListComponent },
      { path: "demo-2", component: Demo2Component },
      // { path: "moreEmployeeData", component: MoreEmployeeDataComponent },
      {
        path: '', loadChildren: () => import('../../modules/more-employee-data/more-employee-data.module')
          .then(m => m.MoreEmployeeDataModule)
      },
      // { path: "", redirectTo: "moreEmployeeData", pathMatch: "full" },
      { path: "**", redirectTo: "", pathMatch: "full" },

    ]
  },
  { path: "", redirectTo: "demo-page", pathMatch: "full" },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoPageRoutingModule { }
