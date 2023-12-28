import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { HistoryPayrollReports } from 'src/app/models/HistoryPayrollReports.models';
import { PayrollReports } from 'src/app/models/PayrollReports.models';
import { SalaryHistory } from 'src/app/models/SalaryHistory.model';
import { Option } from '../../option';
import { FunctionService } from 'src/app/core/data/function.service';
import { DatePipe } from '@angular/common';
import { Message } from 'src/app/models/Message.model';
import { FilePath } from 'src/app/models/FilePath.model';
import { CustomizeMessageService } from '../../customize-message.service';
import { DocumentsForEmploeey } from 'src/app/models/DocumentsForEmploeey.models';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';





@Component({
  selector: 'jer-payroll-reports',
  templateUrl: './payroll-reports.component.html',
  styleUrls: ['./payroll-reports.component.scss'],
  providers: [DatePipe],
})
export class PayrollReportsComponent implements OnInit {

  // startDateValue: Date =new Date(new Date(Date.now()).setMonth(0));;
  startDateValue: Date = new Date();
  endDateValue: Date = new Date(Date.now());

  exportColumns: any[] = [];
  subscriptioncolumns: Option[] = [
    { key: 'identityNumber', value: 'זהות עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: 'אגף' },
    { key: 'status', value: 'סטטוס' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'altenateSubscribersNumber', value: 'מספר מנוי חלופי' },
    { key: 'satrtDate', value: 'תאריך התחלה', isDate: true, type: 'date' },
    { key: 'sticker', value: 'מספר מדבקה' },
    { key: 'carNumber', value: 'מספר רכב' },
    // { key: 'salaryUpdated', value: 'עודכן בשכר', isBoolean: true, type: 'boolean' },
    { key: 'description', value: 'תיאור' }

  ];
  salaryHistoryColumns: Option[] = [
    { key: 'date', value: 'תאריך', isDate: true },
    { key: 'fileSent', value: 'קובץ שנשלח', isLink: true },
    { key: 'numberOfLines', value: 'מספר שורות בקובץ' },
    { key: 'fileReceived', value: 'קובץ שהתקבל', isLink: true }
  ]
  linkString: string = "fkjhf";
  payrollReportsArray: PayrollReports[] = [];
  historyPayrollReportsArray: HistoryPayrollReports[] = [];
  historyPayrollReports: HistoryPayrollReports[] = [];
  historyData: SalaryHistory[] = [];
  selectedDetails: PayrollReports[] = [];
  customers: PayrollReports[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  data: any[] = [];
  representatives: PayrollReports[] = [];
  selectAll: boolean = false;
  first = 0;
  rows = 10;
  email: Message | undefined;
  file: FilePath | undefined;
  pdfSrc = "";
  http: any;

  constructor(public apiService: ApiService, private functionService: FunctionService, private datePipe: DatePipe, private customizeMessageService: CustomizeMessageService) { }

  ngOnInit(): void {
    document.getElementById("table1")?.style.setProperty('display', 'none');
    document.getElementById("checkBox")?.style.setProperty('aria-checked', 'true');
    this.getData();
    this.historyPayrollReportsArray = [];
  }

  show() {
    document.getElementById("table1")?.style.setProperty('display', 'inline');
    this.getData();
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
  }

  onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedDetails = value;
  }

  onSelectAllChange(event: boolean) {
    const checked = event;

    if (checked) {
    }
    else {
      this.selectedDetails = [];
      this.selectAll = false;
    }
  }

  getData() {
    const date = { start: new Date(this.startDateValue.getTime() + 86400000), end: new Date(this.endDateValue.getTime()) }
    this.apiService.buildData('get_salary_history', date).subscribe(
      data => {
        this.data = data;
        this.historyPayrollReports = this.data[0];
        this.historyPayrollReportsArray = this.historyPayrollReports;
        this.payrollReportsArray = this.data[1];
      },
      error => {
        console.error(error);
      }
    );

  }

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
    return this.selectedDetails ? this.first === (this.selectedDetails.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.selectedDetails ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  function(e: any, IsPayrollReport: boolean, id?: any) {
    e.originalEvent.body = e.originalEvent.body.map((p: any) => ({ key: p }));
    this.linkString = e.originalEvent.body[0].key;
    if (IsPayrollReport) {
      this.sendReport();
    }
    else {
      this.saveResponse(e, id);
    }
  }

  sendReport() {
    this.file = {
      docPath: this.linkString,
      name: `דו"ח שכר ${Date.now()}`
    }
    this.email = {
      address: 'e@e.com',
      subject: `דו"ח שכר מתאריך ${Date.now()}`,
      message: ` ${Date.now()} מצורף דו"ח שכר לתאריך `,
      addressFrom: 'a@a.com',
      AddressFromDisplay: 'example@gmail.com',
      AddressCC: [],
      AddressTo: [],
      filesPath: [this.file],
      HtmlContent: 'abcdefghijklmnop',
      Name: 'welcome',
      FooterHtml: 'hii',
      HeaderHtml: 'header',
    }
    const message = this.email;
    this.apiService.post('SendEmail/SendEmail', message).subscribe(res => {
      if (res) {
        const insertRow = {
          date: Date.now(),
          FileSent: this.file?.docPath,
          FileReceived: null,
          NumberOfLines: this.payrollReportsArray.length
        }
        this.save(insertRow);
      }
    })

  }

  exportExcel(Download: boolean) {
    let date = this.datePipe.transform(new Date(), 'dd-MM-yyyy', 'he-HE');
    this.functionService.exportExcel(this.payrollReportsArray, this.subscriptioncolumns, `payroll-reports -${date}`, Download).then((file: Blob) => {
      const params = new FormData();
      params.append('file', file, `דוח שכר מתאריך ${date}.xlsx`);
      this.apiService.formData('File/UploadFile', params).subscribe(res => {
        this.linkString = String(res);
        this.sendReport()
      });
    })
  }
  //שמירת קובץ תגובה משכר
  saveResponse(params: any, id?: any) {
    id.fileReceived = this.linkString;
    this.apiService.buildData('upsert_salary_history', id).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
        }
        else {
          this.customizeMessageService.Error(res[0][0].msg);
        }
      }
    )
  }
  //שמירה בהיסטוריית שליחות לשכר
  save(params: any) {
    params.date = new Date();
    this.apiService.buildData('upsert_salary_history', params).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
          this.updateAllRows();
        }
        else {
          this.customizeMessageService.Error(res[0][0].msg);
        }
      }
    )
  }
  //עדכון כל השורות בטבלה לניתוב של הקובץ שעודכן
  updateAllRows() {
    this.apiService.buildData('upsert_file_url', { url: this.linkString }).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
          this.getData();
        }
        else {
          this.customizeMessageService.Error(res[0][0].msg);
        }
      }
    )
  }
  //הצגת הקובץ מהלינק
  showFile(item: any) {
    this.apiService.post('File/ReadFile', { path: item }).subscribe(
      data => {
        if (data) {
          this.functionService.downloadFile(data, this.cutFileName(item));
        }
      },
      err => {
        console.log('err', err);
      });
  }

  cutFileName(item: any) {
    var res = item.substr(item.lastIndexOf('\\') + 1);
    res = res.substr(0, res.lastIndexOf('.'));
    return res;
  }
  printExcel(d: any) {
    // const byteArray = new Uint8Array(
    //   atob(d)
    //     .split("")
    //     .map(char => char.charCodeAt(0))
    // );
    // const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    // const url = window.URL.createObjectURL(blob);
    // window.open(url);
    // this.functionService.downloadFile(d);
    // this.exportToExcel()
  }

  get environment() { return environment.apiEndpoint; }

}

