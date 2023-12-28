import { Component, OnInit } from '@angular/core';
import { WaitingParking } from 'src/app/models/WaitingParking.model';
import { Option } from '../../option';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { MessageService } from 'primeng/api';
import { CustomizeMessageService } from '../../customize-message.service';
import { Router } from '@angular/router';


@Component({
  selector: 'jer-waiting-parking',
  templateUrl: './waiting-parking.component.html',
  styleUrls: ['./waiting-parking.component.scss']
})
export class WaitingParkingComponent implements OnInit {

  public waitingParkingArray: WaitingParking[] = [];
  display: boolean = false;
  showConfirmDel = false;
  deleteItem: any;
  disabledDelete: boolean = false;
  data: any[] = [];


  columns: Option[] = [
    { key: 'identityNumber', value: 'תעודת זהות ' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: ' אגף' },
    { key: 'status', value: 'סטטוס  ' },
    { key: 'statusOrEligibility', value: 'מעמד או זכאות' },
    { key: 'subscriptionNumber', value: 'מספר מנוי' },
    { key: 'currentParkingSpace', value: 'מקום חניה זמני' },
    { key: 'parkingSpaceRequested', value: 'מקום חניה מבוקש' },
    { key: 'startDate', value: 'תאריך התחלה ', isDate: true, type: 'date' }

  ];
  constructor(private customizeMessageService: CustomizeMessageService, private apiService: ApiService, private messageService: MessageService,private rout: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.apiService.buildData('get_all_data_with_waitingParking', null).subscribe(
      data => {
        this.data = data[0];      },
      error => {
        console.log(error);
      }
    )
  }

  delete(event: any) {
    this.showConfirmDel = false;
    this.apiService.buildData('delete_waiting_for_alternative_parking', { id: this.deleteItem.identityNumber }).subscribe(
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

  afterSubmit(e: any) {
    this.display = false;
  }

  clear(table: Table) {
    table.clear();
  }

  handleFilter(e: any, a: any) {
  }

  showEmlpoyeeSubscription(id:number){
    this.rout.navigate(['EmployeeSubscriptionDetails'], { queryParams: {identityNumber:id}});    
  }
}















