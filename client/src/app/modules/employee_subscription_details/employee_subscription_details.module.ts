import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {CardModule} from 'primeng/card';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DialogModule} from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeSubscriptionDetailsComponent } from './employee-subscription-details/employee-subscription-details.component';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import {CheckboxModule} from 'primeng/checkbox';
import { newSubscriptionMoudle } from '../new subscription/new_subscription.module';
import { MessagesModule } from 'primeng/messages';
import { EmployeeSubscriptionDetailsRoutingModule } from './employee-subscription-details-routing.module';
import { DeleteModule } from '../delete/delete.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { MoreEmployeeDataModule } from '../more-employee-data/more-employee-data.module';
import { Accordion, AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    EmployeeSubscriptionDetailsComponent,
  ],
  exports: [EmployeeSubscriptionDetailsComponent],
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
    newSubscriptionMoudle,
    MessagesModule,
    EmployeeSubscriptionDetailsRoutingModule,
    DeleteModule,
    primeNgModule,
    MoreEmployeeDataModule,
    AccordionModule

  ]
})
export class EmployeeSubscriptionDetailsModule { }