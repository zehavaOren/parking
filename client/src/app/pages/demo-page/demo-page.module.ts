import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoPageRoutingModule } from './demo-page-routing.module';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { DemoModule } from 'src/app/modules/demo/demo.module';
import { EntitlementDetailsModule } from "../../modules/entitlement_details/entitlement.module";
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { EmployeeSubscriptionDetailsModule } from 'src/app/modules/employee_subscription_details/employee_subscription_details.module';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MoreEmployeeDataModule } from 'src/app/modules/more-employee-data/more-employee-data.module';
import { ShareModule } from 'src/app/core/share/share.module';
// import { MoreEmployeeDataModule } from 'src/app/modules/more-employee-data/more-employee-data.module';

@NgModule({
    declarations: [
        DemoPageComponent,
    ],
    imports: [
        CommonModule,
        DemoPageRoutingModule,
        DemoModule,
        EntitlementDetailsModule,
        primeNgModule,
        // EmployeeSubscriptionDetailsModule,
        // DropdownModule,
        // DragDropModule,
        RouterModule,
        TranslateModule,
        ShareModule,
        // WaitingParkingModule,
        TabMenuModule,
        ToolbarModule, ButtonModule, MenuModule, MenubarModule, SidebarModule, InputTextModule, FileUploadModule, HttpClientModule,
        MoreEmployeeDataModule
    ]



})
export class DemoPageModule { }
