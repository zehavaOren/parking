import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/data/api.service';
import { history } from 'src/app/models/history.model'
import { Option } from 'src/app/pages/option';
@Component({
  selector: 'jer-history-data',
  templateUrl: './history-data.component.html',
  styleUrls: ['./history-data.component.scss']
})
export class HistoryDataComponent implements OnInit {

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
   this.getData();
  }
  historyColumns: (Option)[] = [
    { key: 'status', value: '  דרגה ' },
    { key: 'parkingSpace', value: 'מקום חניה ' },
    { key: 'subscriptionNumber', value: 'מספר מנוי ' },
    { key: 'carNumber', value: ' מספר רכב' },
    { key: 'locationOutsideTheSquare', value: '  מקום מחוץ לכיכר' },
    { key: 'monthlyParkingFee', value: "דמי השתתפות" },
    { key: 'sticker', value: '  מדבקה' },
    { key: 'startDate', value: '  תאריך התחלה' ,isDate:true},
    { key: 'expiryDate', value: "תאריך תפוגה" , isDate:true}


  ];


  data: any[] = [];
  public history: history[] = [];

  getData() {
    this.apiService.buildData('get_all_data_with_history', { id: 89 }).subscribe(
      data => {
        this.data = data;
        if (this.data?.length) {
          this.history = this.data[0];

        }


      },
      error => {
        console.error(error);
      }
    );
  }
}
