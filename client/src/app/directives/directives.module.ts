import { DemoDirective } from './demo.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DemoDirective],
  exports: [DemoDirective],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
