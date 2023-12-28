import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { FunctionService } from 'src/app/core/data/function.service';
import { EmployeeSubscriptions } from 'src/app/models/EmployeeSubscriptions.models';
import { PayrollReports } from 'src/app/models/PayrollReports.models';
import { Option } from '../../option';

@Component({
  selector: 'jer-employee-subscriptions',
  templateUrl: './employee-subscriptions.component.html',
  styleUrls: ['./employee-subscriptions.component.scss']
})
export class EmployeeSubscriptionsComponent implements OnInit {

  public employeeSubScriptionsArry: EmployeeSubscriptions[] = [];

  id: number = 0;
  display: boolean = false;

  EmployeeSubscriptionsColumns: Option[] = [
    { key: 'identityNumber', value: 'תז עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: 'אגף' },
    { key: 'status', value: 'סטטוס' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'altenateSubscribersNumber', value: 'מספר מנוי חלופי' },
    { key: 'satrtDate', value: 'תאריך התחלה', isDate: true, type: 'date' },
    { key: 'expiryDate', value: 'תאריך סיום', isDate: true, type: 'date' },
    { key: 'sticker', value: 'מספר מדבקה' },
    { key: 'carNumber', value: 'מספר רכב' }

  ];
  data: any[] = [];
  constructor(public apiService: ApiService, private route: ActivatedRoute, private rout: Router, private functionService: FunctionService) { }

  ngOnInit(): void {
    this.functionService.setTitle.next(null);
    this.checkID();
    this.getData();
  }

  getData() {
    this.apiService.buildData('get_subscribers_and_employees').subscribe(
      data => {
        this.data = data;
        this.employeeSubScriptionsArry = this.data[0];
      },
      error => {
        console.error(error);
      }
    );
  }

  showDialog() {
    this.display = true;
  }

  onRowEditCancel(product: PayrollReports, index: number) {

  }

  afterSubmit(e: any) {
    this.display = false;
  }

  //paging
  first = 0;

  rows = 10;
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.employeeSubScriptionsArry ? this.first === (this.employeeSubScriptionsArry.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.employeeSubScriptionsArry ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  checkID() {
    this.route.queryParams.subscribe(params => {
      this.id = params['identityNumber'];
    });
    if (this.id) {
      this.display = true;
    }
  }

  showEmlpoyeeSubscription(id:number){
    this.rout.navigate(['EmployeeSubscriptionDetails'], { queryParams: {identityNumber:id}});    
  }
}

