import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";
import { EligibilityWaiveComponent } from './eligibility-waive/eligibility-waive.component';
import { EligibilityWaiveRoutingModule } from './eligibility-waive-routing.module';
import { EmployeeSubscriptionDetailsModule as EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";
import { DeleteModule } from "../../modules/delete/delete.module";
import { eligibilityWaiveDetailsModule } from "../../modules/eligibility_waive_details/waiting-confirmation-details.module";
import { primeNgModule } from 'src/app/core/share/primeNg.module';




@NgModule({
    declarations: [EligibilityWaiveComponent],
    imports: [
        CommonModule,
        EligibilityWaiveRoutingModule,
        primeNgModule,
        EmployeeSubscriptionDetailsModule,
        DeleteModule,
        eligibilityWaiveDetailsModule
    ]
})
export class EligibilityWaiveModule { }
