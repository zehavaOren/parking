
import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { FunctionService } from 'src/app/core/data/function.service';
import { EligibilityWaive } from 'src/app/models/EligibilityWaive.models';
import { CustomizeMessageService } from '../../customize-message.service';
import { Option } from '../../option';

@Component({
  selector: 'jer-eligibility-waive',
  templateUrl: './eligibility-waive.component.html',
  styleUrls: ['./eligibility-waive.component.scss']
})
export class EligibilityWaiveComponent implements OnInit {

  eligibilityWaiveArray: EligibilityWaive[] = [];
  first = 0;
  rows = 10;
  workerArry = [];
  display: boolean = false;
  eligibilityWaive: any;
  showConfirmDel = false;
  deleteItem: any;
  toNavigate: boolean = false;
  linkString: string = "";

  columns: Option[] = [
    { key: 'identityNumber', value: 'זהות עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: 'אגף' },
    { key: 'department', value: 'מחלקה' },
    { key: 'job', value: 'תפקיד' },
    // { key: 'jobTitle', value: 'מחלקה' },
    { key: 'statusOrEligibility', value: 'מעמד/זכאות' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'reasonRejection', value: 'סיבת דחיה' },
    { key: 'dateAdded', value: 'תאריך הוספה', type: 'date', isDate: true },
  ];

  constructor(private functionService: FunctionService, private customizeMessageService: CustomizeMessageService, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.buildData('get_eligibility_waive', null).subscribe(
      data => {
        this.eligibilityWaiveArray = data[0];
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteConfirm(item: any) {
    this.deleteItem = item;
    this.showConfirmDel = true;
  }

  delete(event: any) {
    this.showConfirmDel = false;
    this.apiService.buildData('delete_eligibility_waive', { id: this.deleteItem.identityNumber }).subscribe(
      res => {
        const myRes = res[0][0];
        if (myRes.status) {
          this.customizeMessageService.success(myRes.msg)
          this.getData();
        }
        else {
          this.customizeMessageService.Error(myRes.msg)
        }
      },
      error => {
        console.log(error);
      }
    );


  }

  afterSubmit(e: any) {
    this.display = false;
    this.getData();
  }

  // onRowEditInit(e: EligibilityWaive) {
  //   this.eligibilityWaiveArray[e.identityNumber] = { ...e };
  // }

  // onRowEditSave(e: EligibilityWaive, index: number) {
  //   this.eligibilityWaiveArray[index] = e;
  // }

  // onRowEditCancel(product: EligibilityWaive, index: number) {

  // }
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
    return this.eligibilityWaiveArray ? this.first === (this.eligibilityWaiveArray.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.eligibilityWaiveArray ? this.first === 0 : true;
  }
  showDialog() {

    this.display = true;
  }
  clear(table: Table) {
    table.clear();
  }


  excel() {

    this.functionService.exportExcel(this.eligibilityWaiveArray, this.columns, `eligibility-waive`).then((file: Blob) => {
      const params = new FormData();
      params.append('file', file, "מוותרים על זכאות .xlsx");
      this.apiService.formData('File/UploadFileExcel', params).subscribe(res => {
        this.linkString = String(res);
      });
    })
  }

  addSubscriber(item: any) {
    this.router.navigate(['EmployeeSubscriptions'], { queryParams: { identityNumber: item.identityNumber } });
  }
  onUpload(event: any) {
    const res = event.originalEvent.body;
    if (res.status === 1) {
      const colmns: Option[] = this.columns
      const res1 = res.outputDT.map((x: any) => colmns.map(y => ({ [y.value]: x[y.key] })));
      let res2 = res.outputDT.map((x: any) => (this.getRow(colmns, x)));

      res2 = this.setMapOrder(res2);

      this.apiService.buildData('insert_eligibility_waive', { list: res2 }).subscribe(
        res => {
          const myRes = res

          if (myRes[0][0].status) {
            this.customizeMessageService.success(myRes[0][0].msg)
            this.getData();
          }
          else {
            this.customizeMessageService.Error(myRes[0][0].msg)
          }
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.customizeMessageService.Warn(res.msg);
    }

  }

  setMapOrder(list: any[]) {
    return list.map((x: any) => ({
      // date: x.data ?? null,
      dateAdded: x.dateAdded ?? null,
      department: 1 ?? x.department ?? null,
      firstName: x.firstName ?? null,
      identityNumber: x.identityNumber ?? null,
      isMunicipalityEmployee: x.isMunicipalityEmployee ?? null,
      job: x.job ?? null,
      jobTitle: x.jobTitle ?? null,
      lastName: x.lastName ?? null,
      parkingSpace:1 ?? x.parkingSpace ?? null,
      reasonRejection: 1 ?? x.reasonRejection ?? null,
      statusOrEligibility:1?? x.statusOrEligibility ?? null,
      wing: 1?? x.wing ?? null
    }));
  }



  getRow(columns: Option[], x: any): {} {
    let item: any = {};
    columns.forEach(y => {
      item[y.key] = x[y.value]
    });
    return item;
  }
}