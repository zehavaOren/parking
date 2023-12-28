import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ApiService } from 'src/app/core/data/api.service';
import { Search } from 'src/app/models/Search.models';
import { Option } from '../../option';

@Component({
  selector: 'jer-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  // providers: [DatePipe]
})
export class SearchComponent implements OnInit {

  startDateValue: Date | undefined;
  endDateValue: Date | undefined;
  first = 0;
  rows = 10;
  serach: Search[] = [];
  data: any[] = [];

  searchColumns: Option[] = [
    { key: 'parkingSpace', value: 'מקום חניה' },
    { key: 'firstName', value: 'שם פרטי' },
    { key: 'lastName', value: 'שם משפחה' },
    { key: 'wing', value: 'אגף' },
    { key: 'status', value: 'סטטוס' },
    { key: 'stausOrEligability', value: 'מעמד/ זכאות' },
    { key: 'locationOutsideTheSquare', value: 'מקום חניה מחוץ לכיכר' },
    { key: 'subscribersNumber', value: 'מספר מנוי' },
    { key: 'carNumber', value: 'מספר רכב' },
    { key: 'participationFee', value: 'דמי השתתפות', type: 'number' },
    { key: 'sticker', value: 'מספר מדבקה' },
    { key: 'satrtDate', value: 'תאריך התחלה', isDate: true, type: 'date' },
    { key: 'expiryDate', value: 'תאריך תפוגה', isDate: true, type: 'date' },
    { key: 'subscribersStatus', value: 'סטטוס מנוי' },
    { key: 'last', value: 'תאריך עדכון אחרון' , type: 'date'},
  ];

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.startDateValue = new Date(new Date(Date.now()).setMonth(+5));
    this.endDateValue = new Date(Date.now());
    document.getElementById("table")?.style.setProperty('display', 'none');
    this.getData();
  }

  show() {
    document.getElementById("table")?.style.setProperty('display', 'inline');
  }

  getData() {
    const start = (this.startDateValue?.getMonth() + "/" + this.startDateValue?.getDate() + "/" + this.startDateValue?.getFullYear());
    const end = this.endDateValue?.getMonth() + "/" + this.endDateValue?.getDate() + "/" + this.endDateValue?.getFullYear();
    this.apiService.buildData('get_serach', { start: start, end: end }).subscribe(
      // this.apiService.buildData('get_serach',{start: this.startDateValue, end:this.endDateValue}).subscribe(
      data => {
        this.data = data;
        this.serach = this.data[0];
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
    return this.serach ? this.first === (this.serach.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.serach ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
  }

}
