import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntitlementDetailsModule } from "../../modules/entitlement_details/entitlement.module";
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { SubscribersRoutingModule } from './subscribers-routing.module';
import { LastHoldingEmployeeDetailsModule } from 'src/app/modules/lastHoldingEmployee/LastHoldingEmployee.module';
import { DeleteModule } from 'src/app/modules/delete/delete.module';
import { newSubscriptionMoudle } from 'src/app/modules/new subscription/new_subscription.module';


@NgModule({
    declarations: [SubscribersComponent],
    imports: [
        CommonModule,
        FormsModule,
        EntitlementDetailsModule,
        ReactiveFormsModule,
        SubscribersRoutingModule,
        primeNgModule,
        LastHoldingEmployeeDetailsModule,
        DeleteModule,
        newSubscriptionMoudle
    ]
})
export class SubscribersModule { }
