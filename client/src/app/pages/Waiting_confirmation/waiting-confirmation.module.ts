import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WaitingConfirmationComponent } from './waiting-confirmation/waiting-confirmation.component';
import { AwaitingConfirmationRoutingModule } from './waiting-confirmation-routing.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { WaitingConfirmationDetailsModule } from 'src/app/modules/waiting_confirmation_details/waiting-confirmation-details.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { DeleteModule } from 'src/app/modules/delete/delete.module';


@NgModule({
    declarations: [WaitingConfirmationComponent],
    imports: [
        CommonModule,
        FormsModule,
        AwaitingConfirmationRoutingModule,
        primeNgModule,
        WaitingConfirmationDetailsModule,
        ConfirmDialogModule,
        DeleteModule
    ]
})
export class WaitingConfirmationModule { }
