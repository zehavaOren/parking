import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'jer-more-employee-data',
  templateUrl: './more-employee-data.component.html',
  styleUrls: ['./more-employee-data.component.scss']
})
export class MoreEmployeeDataComponent implements OnInit {
  @Input()
  newId: number = 0;
  constructor() { }

  menuItems: [] = [];

  items: MenuItem[] = [];

  ngOnInit(): void {

    this.items = [
      // this.router.navigate(['../WaitingConfirmation'], { queryParams: { identityNumber: this.form1.controls['identityNumber'].value }, relativeTo: this.route });

      // { queryParams: { identityNumber: this.form1.controls['identityNumber'].value }
      { label: 'מסמכים לעובד ', routerLink: ['./docume ntForEmployee'], queryParams: { identityNumber: this.newId } },
      { label: 'סטטוסים לעובד ', routerLink: ['./employeeStatus'], queryParams: { identityNumber: this.newId } },
      { label: ' נתוני היסטוריה', routerLink: ['./historyData'], queryParams: { identityNumber: this.newId } }
    ];
  }

}
