import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntitlementRoutingModule } from './entitlement-routing.module';
import { EntitlementComponent } from './entitlement/entitlement.component';
import { EntitlementDetailsModule } from 'src/app/modules/entitlement_details/entitlement.module';
import { EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";
import { primeNgModule } from 'src/app/core/share/primeNg.module';




@NgModule({
    declarations: [EntitlementComponent],
    imports: [
        CommonModule,
        EntitlementRoutingModule,
        EntitlementDetailsModule,
        // EmployeeSubscriptionDetailsModule,
        primeNgModule
    ]
})
export class EntitlementModule { }
