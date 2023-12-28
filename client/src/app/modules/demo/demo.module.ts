import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoListComponent } from './demo-list/demo-list.component';
import { ShareModule } from 'src/app/core/share/share.module';
import {TableModule} from 'primeng/table';
import { Demo2Component } from '../../modules/demo/demo2/demo2.component';



@NgModule({
  declarations: [
    DemoListComponent,
    Demo2Component,
  ],
  exports:[DemoListComponent],
  imports: [
    CommonModule,
    ShareModule,
    TableModule
  ]
})
export class DemoModule { }
