import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    DeleteComponent,
  ],
  exports: [DeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    primeNgModule
  ]
})
export class DeleteModule { }
