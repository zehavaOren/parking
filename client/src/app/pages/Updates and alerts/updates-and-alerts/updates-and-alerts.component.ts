import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { FunctionService } from 'src/app/core/data/function.service';
import { Entitlement } from 'src/app/models/Entitlement.model';
import { UpdatesAndAlerts } from 'src/app/models/UpdatesAndAlerts.model';
import { Option } from '../../option';

@Component({
  selector: 'jer-updates-and-alerts',
  templateUrl: './updates-and-alerts.component.html',
  styleUrls: ['./updates-and-alerts.component.scss']
})
export class UpdatesAndAlertsComponent implements OnInit {

  startDateValue: Date =new Date();
  endDateValue: Date =new Date();
  firstentitlement = 0;
  rowsentitlement = 10;
  firstupdate = 0;
  rowsupdate = 10;

  newsubScriptionColumns: Option[] = [
    { key: 'employeeNumber', value: 'מספר עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'startDate', value: 'תאריך התחלה', type: 'date' ,  isDate: true},
    { key: 'deductionFromSalary', value: 'הורדה משכר' },
    { key: 'participationFee', value: 'דמי השתתפות', type: 'number' }
  ];
  endedsubScriptionColumns: Option[] = [
    { key: 'employeeNumber', value: 'מספר עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'expiryDate', value: 'תאריך סיום', type: 'date' ,  isDate: true},
    { key: 'deductionFromSalary', value: 'הורדה משכר' },
    { key: 'participationFee', value: 'דמי השתתפות', type: 'number' }
  ];
  changedDataColumns: Option[] = [
    { key: 'employeeNumber', value: 'ת.ז. עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'carNumber', value: 'מספר רכב' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'status', value: 'סטטוס' },
    { key: 'wing', value: 'תפקיד' },


  ];
  expiryColumns: Option[] = [
    { key: 'employeeNumber', value: 'מספר עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'startDate', value: 'תאריך התחלה', type: 'date', isDate: true },
    { key: 'expiryDate', value: 'תאריך התחלה', type: 'date', isDate: true },

  ]
  update: UpdatesAndAlerts[] = [];
  startEntitlement: UpdatesAndAlerts[] = [];
  endEntitlement: UpdatesAndAlerts[] = [];
  expiry: UpdatesAndAlerts[] = [];

  data: any[] = [];
  constructor(private apiService: ApiService, private functionService:FunctionService) { }

  ngOnInit(): void {
    this.startDateValue = new Date(new Date(Date.now()).setMonth(+5));
    this.endDateValue = new Date(Date.now());
    this.getData();
    document.getElementById("wanted")?.style.setProperty('display', 'none');
    document.getElementById("table2")?.style.setProperty('display', 'none');
    document.getElementById("table3")?.style.setProperty('display', 'none');
  }

  show() {
    document.getElementById("table1")?.style.setProperty('display', 'inline');
    document.getElementById("table2")?.style.setProperty('display', 'inline');
    document.getElementById("table3")?.style.setProperty('display', 'inline');
    this.getData();

  }
  
  want() {
    document.getElementById("wanted")?.style.setProperty('display', 'inline');
  }

  getData() {
     const start=this.functionService.converDateToString(this.startDateValue);
     const end=this.functionService.converDateToString(this.endDateValue);
     this.apiService.buildData('get_updates_and_alerts', {start: start,end: end}).subscribe(
      data => {
        this.data = data;
        this.update = this.data[0];
        debugger
        this.startEntitlement = this.data[1];
        this.endEntitlement = this.data[2];
        this.expiry = this.data[3];
      },
      error => {
        console.error(error);
      }
    );
  }

  nextupdate() {
    this.firstupdate = this.firstupdate + this.rowsupdate;
  }

  prevupdate() {
    this.firstupdate = this.firstupdate - this.rowsupdate;
  }

  resetupdate() {
    this.firstupdate = 0;
  }

  isLastPageupdate(): boolean {
    return this.update ? this.firstupdate === (this.update.length - this.rowsupdate) : true;
  }

  isFirstPageupdate(): boolean {
    return this.update ? this.firstupdate === 0 : true;
  }

  clearupdate(table: Table) {
    table.clear();
  }

  next() {
    this.firstentitlement = this.firstentitlement + this.rowsentitlement;
  }

  prev() {
    this.firstentitlement = this.firstentitlement - this.rowsentitlement;
  }

  reset() {
    this.firstentitlement = 0;
  }

  isLastPage(): boolean {
    return this.firstentitlement ? this.firstentitlement === (this.startEntitlement.length - this.rowsentitlement) : true;
  }

  isFirstPage(): boolean {
    return this.firstentitlement ? this.firstentitlement === 0 : true;
  }

  clearentitment(table: Table) {
    table.clear();
  }

}
