import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LastHoldingEmployeeComponent } from './last-holding-employee/last-holding-employee.component';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { EmployeeSubscriptionDetailsModule } from '../employee_subscription_details/employee_subscription_details.module';


@NgModule({
  declarations: [
    LastHoldingEmployeeComponent,
  ],
  exports: [LastHoldingEmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeSubscriptionDetailsModule,
    primeNgModule
  ]
})
export class LastHoldingEmployeeDetailsModule { }
