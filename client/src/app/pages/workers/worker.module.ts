import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerRoutingModule } from './worker-routing.module';
import { WorkerComponent } from './worker/worker.component';
import { EntitlementDetailsModule } from "../../modules/entitlement_details/entitlement.module";
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";


@NgModule({
    declarations: [WorkerComponent],
    imports: [
        CommonModule,
        WorkerRoutingModule,
        EntitlementDetailsModule,
        primeNgModule,
        EmployeeSubscriptionDetailsModule
    ]
})
export class WorkerModule { }
