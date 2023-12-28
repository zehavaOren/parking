import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Option } from '../../option';
@Component({
  selector: 'jer-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent implements OnInit {
  display: boolean = false;
  displayNew: boolean = false;


  constructor(private translate: TranslateService) {
   }

  menuItems: [] = [];

  items: MenuItem[] = [];
  EmployeeSubscriptionsColumns: Option[] = [
    { key: 'identityNumber', value: 'סוג מסמך ' },
    { key: 'firstName', value: 'תאריך' },
    { key: 'lastName', value: 'תיאור מסמך' },
    { key: 'wing', value: 'צורף ע"י' },
    // סוג מסמך
    // תאריך
    // תיאור מסמך
    // צורף ע"י
    // קובץ
    // עריכה
    // מחיקה

  ];
  // items1: MenuItem | undefined;

  public topBarMenuItems: Array<any> = [];

  // @ViewChild('dt')dt = undefined;
  // countries: any[] = [];

  // selectedCountry: string | undefined;

  // carsData = [
  //   { "brand": "VW", "year": 2012, "color": "Orange", "vin": "dsad231ff" },
  //   { "brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345" },
  //   { "brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr" },
  //   { "brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh" },
  //   { "brand": "Mercedes", "year": 1995, "color": "Orange", "vin": "hrtwy34" },
  //   { "brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj" },
  //   { "brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr" },
  //   { "brand": "Jaguar", "year": 2013, "color": "Orange", "vin": "greg34" },
  //   { "brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5" },
  //   { "brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s" }
  // ];
  // selectedColumns = [];
  // selectedCar1 = null;

  columns = [
    { field: "vin", header: "Vin", width: "10%" },
    { field: "year", header: "Year", width: "20%" },
    { field: "brand", header: "Brand", width: "15%" },
    { field: "color", header: "Color", width: "5%" }
  ];


  tryClose(item: any) {
  }

  ngOnInit() {
    this.items = [
      { label: 'מסמכים ', icon: 'pi pi-building', routerLink: ['./demo-component'] },
      { label: '-2מסמכים ', icon: 'pi pi-building', routerLink: ['./demo-2'] },
      // { label: ' הרשאות ', icon: 'pi pi-user', routerLink: ['./permissions-management'] },
      // { label: ' חברות אבטחה ', icon: 'pi pi-lock', routerLink: ['./security-company'] },
      // { label: ' סעיפים ', icon: 'pi pi-building', routerLink: ['../clause'] },
      // { label: ' חוזים ', icon: 'pi pi-building', routerLink: ['../contract'] }

    ];
    //   this.items = [
    //     { label: 'מסמכים לעובד', icon: 'pi pi-fw pi-file' }
    // ];
    // this.items1=   { label: 'מסמכים לעובד', icon: 'pi pi-fw pi-file' }
  }
  showDialog() {
    this.display = true;
  }
  showNew() {
    this.displayNew = true;

  }

}


