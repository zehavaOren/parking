import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Option } from '../../option';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { WaitingConfirmation } from 'src/app/models/WaitingConfirmation.models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomizeMessageService } from '../../customize-message.service';
import { FunctionService } from 'src/app/core/data/function.service';



@Component({
  selector: 'jer-waiting-confirmation',
  templateUrl: './waiting-confirmation.component.html',
  styleUrls: ['./waiting-confirmation.component.scss']
})
export class WaitingConfirmationComponent implements OnInit {

  public waitingConfirmationArry: WaitingConfirmation[] = [];

  ide: number = 0;
  first = 0;
  rows = 10;
  display: boolean = false;
  data: any[] = [];
  clonedEntitlement: { [s: string]: WaitingConfirmation; } = {};
  showConfirmDel = 0;
  deleteItem: any;
  disabledDelete: boolean = false;


  columns: Option[] = [
    { key: 'identityNumber', value: 'מספר זהות' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'wing', value: 'אגף' },
    { key: 'department', value: 'מחלקה' },
    { key: 'job', value: 'תפקיד' },
    { key: 'jobTitle', value: 'תיאור תפקיד' },
    { key: 'status', value: 'סטטוס' },
    { key: 'statusOrElogibility', value: ' זכאות /מעמד' },
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'isMunicipalityEmployee', value: 'עובד עיריה' },
  ];

  constructor(private customizeMessageService: CustomizeMessageService, public apiService: ApiService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private functionService: FunctionService) { }

  ngOnInit(): void {
    this.functionService.setTitle.next(null);
    this.getID();
    this.getData();
  }

  onRowEditInit(e: WaitingConfirmation) {
    this.clonedEntitlement[e.employeeNumber] = { ...e };
  }

  onRowEditSave(e: WaitingConfirmation, index: number) {
    this.waitingConfirmationArry[index] = e;
  }

  onRowEditCancel(product: WaitingConfirmation, index: number) {
  }

  showDialog() {
    this.display = true;
  }

  afterSubmit(e: any) {
    this.display = false;
    this.ngOnInit();
  }
  //בדיקה האם הגענו ממנוי ועובד חדש שלא קיים בממתינים לאישור
  getID() {
    this.route.queryParams.subscribe((data) => {

      this.ide = +data['identityNumber'];
      if (this.ide) {

        this.showDialog();
      }
    });
    // this.route.paramMap.subscribe((data) => {
    //   if (data.get('identityNumber') != null) {
    //     this.showDialog();
    //   }
    // });
  }

  getData() {
    this.apiService.buildData('get_all_data_with_waitingConfirmation_by_indentiyNumber', null).subscribe(
      data => {
        this.data = data;
        if (this.data[0]?.length) {
          this.waitingConfirmationArry = this.data[0];
        }
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
    return this.waitingConfirmationArry ? this.first === (this.waitingConfirmationArry.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.waitingConfirmationArry ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

  confirmEmp(event: any) {
    this.showConfirmDel = 0;
    this.apiService.buildData('delete_waiting_confirmation', { id: this.deleteItem.identityNumber }).subscribe(
      res => {
        const myRes = res[0][0];
        if (myRes.status) {
          this.customizeMessageService.success(myRes.msg)
          this.getData();
          this.disabledDelete = true;
          if (event) {
            this.router.navigate(['EmployeeSubscriptionDetails'], { queryParams: { identityNumber: this.deleteItem.identityNumber, check: false } });
          }
        }
        else {
          this.customizeMessageService.Error(myRes.msg)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  delete() {
    this.showConfirmDel = 0;
    this.apiService.buildData('delete_row_waiting_confirmation', { id: this.deleteItem.identityNumber }).subscribe(
      res => {
        const myRes = res[0][0];
        if (myRes.status) {
          this.customizeMessageService.success(myRes.msg)
          this.getData();
          this.disabledDelete = true;
        }
        else {
          this.customizeMessageService.Error(myRes.msg)
        }
      }
      ,
      error => {
        console.log(error);
      })

  }

  confirmDialog(e: any) {
    switch (this.showConfirmDel) {
      case 1:
        this.confirmEmp(e);
        break;
      case 2:
        this.delete();
        break;

      default:
        break;
    }
    (this.showConfirmDel)
  }

  deleteConfirm(type: number, item: any) {
    this.deleteItem = item;
    this.showConfirmDel = type;
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'האם אתה בטוח?', detail: 'אשר כדי להמשיך' });
  }

  // checkExistingParams() {
  //   this.route.paramMap.subscribe((data) => {
  //     if (data.get('identityNumber') != null) {
  //       this.ide = Number(data.get('identityNumber'));
  //     }
  //   })
  //   if (this.ide != 0) {
  //     this.display = true;
  //   }

  // }

}













