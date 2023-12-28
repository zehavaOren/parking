import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/data/api.service';
import { emploeeyStatus } from 'src/app/models/emploeeyStatus.model';
import { Option } from 'src/app/pages/option';

@Component({
  selector: 'jer-employee-statuses',
  templateUrl: './employee-statuses.component.html',
  styleUrls: ['./employee-statuses.component.scss']
})
export class EmployeeStatusesComponent implements OnInit {

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  statusColumns: (Option)[] = [
    { key: 'status', value: 'סטאטוס' },
    { key: 'statusDate', value: 'תאריך סטאטוס', isDate:true }
  ];

  data: any[] = [];
  public emploeeyStatus: emploeeyStatus[] = [];


    getData() {
      this.apiService.buildData('get_all_data_with_status_history', { id: 89 }).subscribe(
        data => {
          this.data = data;
          
          if (this.data?.length) {
            this.emploeeyStatus = this.data[0];
  
          }
  
  
        },
        error => {
          console.error(error);
        }
      );
    }
}