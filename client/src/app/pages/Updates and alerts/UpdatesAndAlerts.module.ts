import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesAndAlertsComponent } from './updates-and-alerts/updates-and-alerts.component';
import { UpdatesAndAlertsRoutingModule } from './UpdatesAnAlertsrouting.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { ShareModule } from 'src/app/core/share/share.module';


@NgModule({
    declarations: [UpdatesAndAlertsComponent],
    imports: [
        UpdatesAndAlertsRoutingModule,
        CommonModule,
        primeNgModule,
        // ShareModule     
    ]
})
export class UpdatesAndAlertsModule { }
