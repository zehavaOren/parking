import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { group } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/data/api.service';
import { Search } from 'src/app/models/Search.models';
import { Option } from 'src/app/pages/option';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'jer-last-holding-employee',
  templateUrl: './last-holding-employee.component.html',
  styleUrls: ['./last-holding-employee.component.scss']
})
export class LastHoldingEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService, private route: ActivatedRoute, private router: Router) { }
  // flag:boolean=false;
  visible:boolean=false;
  identiyNamber:number=0;
  
  history_sub: Option[] = [
    { key: 'employeeName', value: 'שם עובד' },
    { key: 'subscriptionNumber', value: 'מספר מנוי' },
    { key: 'stickerNumber', value: 'מספר מדבקה' },
    { key: 'fromDate', value: 'מתאריך' ,isDate: true, type: 'date' },
    { key: 'toDate', value: 'עד תאריך',isDate: true, type: 'date'  },
    
  ];
  
   
  @Input()
  subscribers:any
 
  
  ngOnInit(): void {
    this.getHistorySubscription()
  }

data3: any[] = [];
getHistorySubscription(){
  this.visible=true;
  this.apiService.buildData('get_history_employee_subsciption',{subscriptionKey: this.subscribers.key}).subscribe(
    data3 => {
      this.data3 = data3;
    },
    error => {
      console.log(error);
    }
  )
}
showEmployeeSubscription( id:number){  
  this.identiyNamber=id
  this.router.navigate(['EmployeeSubscriptionDetails'], { queryParams: {identityNumber:id}});       
}

}




  
 


  

  
 












