import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    AccordionModule
  ]
})
export class ShareModule { }
