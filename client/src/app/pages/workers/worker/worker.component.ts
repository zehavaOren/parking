import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { Workers } from 'src/app/models/Workers.models';
import { Option } from '../../option';


@Component({
  selector: 'jer-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  public workerArry: Workers[] = [];
  visible: boolean = false;

  columns: Option[] = [
    { key: 'employeeNumber', value: 'מס עובד' },
    { key: 'identityNumber', value: 'זהות עובד' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: 'אגף' },
    { key: 'job', value: 'תפקיד' },
    { key: 'status', value: 'סטטוס' },
    { key: 'statusEligibility', value: 'מעמד / זכאות ' },
    { key: 'subscriberStatus', value: 'סטטוס מנוי' },
    { key: 'municipalEmployee', value: 'עובד עירייה' }
  ];
  constructor(public apiService: ApiService) { }



  ngOnInit(): void {
    this.getData();
  }

  data: any[] = [];


  getData() {
    this.apiService.buildData('get_all_data_with_employees').subscribe(
      data => {
        this.data = data;
        this.workerArry = this.data[0];
      },
      error => {
        console.error(error);
      }
    );
  }

  clear(table: Table) {
    table.clear();
  }

  afterSubmit(e: any) {
    this.visible = false;
    this.getData();
  }

  showDialog() {
    this.visible = true;
  }
}

