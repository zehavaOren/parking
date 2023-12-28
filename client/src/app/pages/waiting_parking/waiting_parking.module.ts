import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitlementDetailsModule } from 'src/app/modules/entitlement_details/entitlement.module';
import { EmployeeSubscriptionDetailsModule } from "../../modules/employee_subscription_details/employee_subscription_details.module";
import { WaitingParkingComponent } from './waiting-parking/waiting-parking.component';
import { WaitingParkingRoutingModule } from './waiting_parking_routing.module';
import { DeleteModule } from 'src/app/modules/delete/delete.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';




@NgModule({
    declarations: [WaitingParkingComponent],
    imports: [
        CommonModule,
        EntitlementDetailsModule,
        WaitingParkingRoutingModule,
        primeNgModule,
        DeleteModule,
        EmployeeSubscriptionDetailsModule
    ]
})
export class WaitingParkingModule { }
