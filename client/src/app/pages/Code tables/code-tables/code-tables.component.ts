import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/core/data/api.service';
import { Option } from '../../option';


@Component({
  selector: 'jer-code-tables',
  templateUrl: './code-tables.component.html',
  styleUrls: ['./code-tables.component.scss'],
  providers: [MessageService]

})

export class CodeTablesComponent implements OnInit {
  codeTablesArry: any;
  valueOption:string='';
  orderCode:number=0;
  wing:string='';
  flag:boolean=false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private messageService: MessageService) { }


  CodeColumns: Option[] = [
    { key: 'value', value: 'מספר עובד' },
  ]

  ngOnInit(): void {
    this.getOptinList();

  }
  getDataByWing() {
    this.apiService.buildData('get_options_by_table', { tableNo: 1}).subscribe(
      data3 => {
        this.data3 = data3;
      },
      error => {
        console.log(error);
      }
    )
  }

  data: any[] = [];
  getOptinList() {
    this.apiService.buildData('get_options_values', null).subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      }
    )

  }
  data2: any[] = [];

  getOptionByID() {
    this.apiService.buildData('get_options_by_table', { tableNo: this.codeTablesArry}).subscribe(
      data2 => {
        this.data2 = data2;
      },
      error => {
        console.log(error);
      }
    )
    if(this.codeTablesArry==2){
      this.flag=true;
      this.getDataByWing();
    }
    else{
      this.flag=false;
    }
  }

  data3: any[] = [];

  addOption() {
    for (let i = 0; i < this.data2[0].length; i++) {
      this.orderCode++;
    }
    this.apiService.buildData('upsert_option', { tableNo: this.codeTablesArry ,orderCode: this.orderCode+1,value:this.valueOption,wing:null}).subscribe(
      data3 => {
        this.data3 = data3;
      },
      error => {
        console.log(error);
      }
    )
    this.getOptionByID()
    this.valueOption="";
  }
}





