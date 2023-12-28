import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitlementDetailsComponent } from './entitlement-details/entitlement-details.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';


@NgModule({
  declarations: [
    EntitlementDetailsComponent
  ],
  exports: [EntitlementDetailsComponent],
  imports: [
    CommonModule,
    CalendarModule,
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputSwitchModule,
    DialogModule,
    DropdownModule,
    CheckboxModule,
  ]
})
export class EntitlementDetailsModule { }
