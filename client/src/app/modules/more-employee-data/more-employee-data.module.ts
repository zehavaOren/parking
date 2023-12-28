import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreEmployeeDataRoutingModule } from './more-employee-data-routing.module';
import { primeNgModule } from 'src/app/core/share/primeNg.module';
import { MoreEmployeeDataComponent } from './more-employee-data/more-employee-data.component';
import { DocumentsForEmployeeComponent } from './documents-for-employee/documents-for-employee.component';
import { HistoryDataComponent } from './history-data/history-data.component';
import { EmployeeStatusesComponent } from './employee-statuses/employee-statuses.component';
import { DocumentForEmploeeyDetailsComponent } from './document-for-emploeey-details/document-for-emploeey-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommitmentDocumentComponent } from './commitment-document/commitment-document.component';

@NgModule({
  declarations: [
    MoreEmployeeDataComponent,
    HistoryDataComponent,
    DocumentsForEmployeeComponent,
    EmployeeStatusesComponent,
    DocumentForEmploeeyDetailsComponent,
    CommitmentDocumentComponent
  ],
  imports: [
    CommonModule,
    MoreEmployeeDataRoutingModule,
    primeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MoreEmployeeDataComponent, primeNgModule],

})
export class MoreEmployeeDataModule { }
