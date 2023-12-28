import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntitlementDetailsModule } from "../../modules/entitlement_details/entitlement.module";
import { EmployeeSubscriptionsComponent } from './employee-subscriptions/employee-subscriptions.component';
import { EmployeeSubscriptionsRoutingModule } from './employeeSubscriptions-routing.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";


@NgModule({
    declarations: [EmployeeSubscriptionsComponent],
    imports: [
        CommonModule,
        EmployeeSubscriptionsRoutingModule,
        FormsModule,
        EntitlementDetailsModule,
        primeNgModule,
        EmployeeSubscriptionDetailsModule
    ]
})
export class EmployeeSubscriptionsModule { }
