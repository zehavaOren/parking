import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WaitingConfirmationDetailsComponent } from './waiting-confirmation-details/waiting-confirmation-details.component';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';

@NgModule({
  declarations: [
    WaitingConfirmationDetailsComponent
  ],
  exports: [WaitingConfirmationDetailsComponent],
  imports: [
    CommonModule,
    CalendarModule,
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputSwitchModule,
    DialogModule,
    CheckboxModule,
    DropdownModule,
    MessagesModule
  ]
})
export class WaitingConfirmationDetailsModule { }
