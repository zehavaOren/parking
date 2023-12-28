import { Component, OnInit } from '@angular/core';
import { Entitlement } from 'src/app/models/Entitlement.model';
import { } from 'primeng/table';
import { Option } from '../../option';
import { ApiService } from 'src/app/core/data/api.service';
import { MessageService } from 'primeng/api';
import { CustomizeMessageService } from '../../customize-message.service';



@Component({
  selector: 'jer-entitlement',
  templateUrl: './entitlement.component.html',
  styleUrls: ['./entitlement.component.scss']
})
export class EntitlementComponent implements OnInit {

  public entitlementArray: Entitlement[] = [];

  display: boolean = false;
  data: any[] = [];
  entitlement: any;

  columns: Option[] = [
    { key: 'parkingSpaceDec', value: 'מקום חניה' },
    { key: 'statusOrEligibilityDec', value: 'זכאות עובד' },
    { key: 'participantionFee', value: 'דמי השתתפות' },
    { key: 'expiryDateChargeDec', value: 'חיוב תאריך תפוגה' },
    { key: 'fromDate', value: ' תאריך אתחלה', isDate: true, type: 'date' },
    { key: 'untilDate', value: ' תאריך סיום', isDate: true, type: 'date' }
  ];

  constructor(private apiService: ApiService, private messageService: MessageService, private customizeMessageService: CustomizeMessageService,) { }

  ngOnInit(): void {
    this.getData();
  }


  getData() {
    this.apiService.buildData('get_entitlement', null).subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    )
  }


  showDialog(item: any) {
    this.display = true;
    this.entitlement = item;
  }

  afterSubmit(e: any) {
    this.getData();
    this.display = false;
    this.entitlement = null;
  }
}
