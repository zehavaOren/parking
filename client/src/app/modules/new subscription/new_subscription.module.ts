import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { NewSubscriptionComponent } from './new-subscription/new-subscription.component';

@NgModule({
  declarations: [
    NewSubscriptionComponent
  ],
  exports: [NewSubscriptionComponent],
  imports: [
    CommonModule,
    CalendarModule,
    InputTextModule, 
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputSwitchModule,
    DialogModule,
    InputMaskModule,
    DropdownModule,
    CheckboxModule, 
  ]
})
export class newSubscriptionMoudle { }
