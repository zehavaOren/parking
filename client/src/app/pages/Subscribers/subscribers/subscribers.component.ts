import { group } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/data/api.service';
import { FunctionService } from 'src/app/core/data/function.service';
import { Option } from '../../option';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';



@Component({
  selector: 'jer-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss'],
  providers: [DatePipe],
})
export class SubscribersComponent implements OnInit {
  subscriberForm: FormGroup = new FormGroup({})
  visible: boolean = false;
  flag: boolean = false;
  deleteItem: any;
  subsciberArray: any[] = [];
  showConfirmDel = false;
  editSubscriber: any;
  disabledDelete: boolean = false;

  @Output() afterSubmit: EventEmitter<boolean> = new EventEmitter();

  columns: Option[] = [
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'subscriptionNumber', value: 'מספר מנוי' },
    { key: 'replacementNumber', value: 'מספר חילופי' },
    { key: 'lastHoldingEmployee', value: 'עובד מחזיק אחרון' },
    { key: 'status', value: 'סטטוס' },
  ];

  constructor(private customizeMessageService: CustomizeMessageService, private fb: FormBuilder, private apiService: ApiService, private functionService: FunctionService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initForm();
    this.getOptionByID();
    this.getData();
  }

  data: any[] = [];

  initForm() {
    this.subscriberForm = this.fb.group({
      parkingSpace: [null],
      subscriptionsAvailable: [null],
      subscriptionNumber: [null],
      replacementNumber: [null],
      stickerNumber: [null],
    });
  }

  data2: any[] = [];

  getOptionByID() {
    this.apiService.buildData('get_options_by_table', { tableNo: 3 }).subscribe(
      data2 => {
        this.data2 = data2;
      },
      error => {
        console.log(error);
      }
    )
  }

  index: number = 0

  getData() {
    let params = { ...this.subscriberForm.getRawValue() };
    this.apiService.buildData('get_subscribers', params).subscribe(
      data => {
        this.data = data;
        this.subsciberArray = this.data[0];
      },
      error => {
        console.log(error);
      }
    )

  }

  aaa: any
  showDialog(a: any) {
    this.aaa = a;
    this.visible = true;
  }

  addSubsciber() {
    this.flag = true;
  }

  afterAddNew(e: any) {
    this.flag = false;
    this.getData();
  }

  Reset() {
    this.initForm();
    this.getData();
  }

  delete(event: any) {
    this.showConfirmDel = false;
    this.apiService.buildData('delete_subscribers', { id: this.deleteItem.key }).subscribe(
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
  exportExcel() {
    const date = this.datePipe.transform(new Date(), 'dd/MM/yyyy', 'he-HE');
    this.functionService.exportExcel(this.subsciberArray, this.columns, `subscriber-reports -${date}`)
  }

}












