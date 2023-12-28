import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PayrollReportsComponent } from './payroll-reports/payroll-reports.component';
import {PayrollReportsRoutingModule} from '../Payroll reports/payrollReports-routing.module'
import { DemoModule } from 'src/app/modules/demo/demo.module';
import {HttpClientModule} from '@angular/common/http';
import { primeNgModule } from 'src/app/core/share/primeNg.module';


@NgModule({
    declarations: [PayrollReportsComponent],
    imports: [
        DemoModule,
        PayrollReportsRoutingModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        primeNgModule
    ]
})
export class PayrollReportsModule { }
