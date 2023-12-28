import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/data/api.service';
import { EmployeeSubscriptions } from 'src/app/models/EmployeeSubscriptions.models';
import { Entitlement } from 'src/app/models/Entitlement.model';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';
import { Option } from 'src/app/pages/option';


@Component({
  selector: 'jer-entitlement-details',
  templateUrl: './entitlement-details.component.html',
  styleUrls: ['./entitlement-details.component.scss']
})

export class EntitlementDetailsComponent implements OnInit {

  form1: FormGroup = new FormGroup({})
  data: any;
  optionsList: Array<Option[]> = [];
  params: any;
  @Output() afterSubmit: EventEmitter<object> = new EventEmitter();
  @Input()
  current_entitlement: Entitlement = new Entitlement();
  @Input()
  current_employee_subscriptions: EmployeeSubscriptions = new EmployeeSubscriptions();

  constructor(private customizeMessageService: CustomizeMessageService, private fb: FormBuilder, private apiService: ApiService) { }
  
  ngOnInit(): void {
    this.initForm();
    this.getTablesCode();

  }

  initForm() {
    this.form1 = this.fb.group({
      statusOrEligibility: [null, Validators.required],
      parkingSpace: [null, Validators.required],
      participantionFee: [null],
      expiryDateCharge: [null],
      fromDate: [new Date(), Validators.required],
      untilDate: [null]
    });

    if (this.current_entitlement) {
      this.form1.patchValue(this.current_entitlement);
      this.form1.get('parkingSpace')?.setValue(1)
      this.form1.disable();
      this.form1.get('untilDate')?.enable();
     setTimeout(() => {
        this.customizeMessageService.Warn("לא ניתן לשנות את הזכאות הקימת , הכנס תאריך סיום  הזכאות  והוסף זכאות חדשה")
      }, 0);
    }

  }

  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const stausOrEligabilitys = this.getTableCode(5);
    const parkingSpaces = this.getTableCode(3);
    forkJoin([stausOrEligabilitys, parkingSpaces]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);
    });
  }

  saveForm() {
    if (this.current_entitlement) {
      const id = this.current_entitlement.id ?? null;
      this.params = { ...this.form1.getRawValue(), ...{ id }, };
      this.upsert();
    }
    else {
      this.params = { ...this.form1.getRawValue(), };
    }
    if (this.params.expiryDateCharge) {
      if (this.params.untilDate == null) {
        this.customizeMessageService.Error("סומן חיוב תאריך תפוגה ולא הוכנס תאריך סיום")
        return
      }
    }
    else {
      this.params.expiryDateCharge = 0;
    }

    if (!this.current_entitlement) {
      this.apiService.buildData('checking_entitlement', this.params).subscribe(
        res => {
          if (res[1][0].status) {
            this.customizeMessageService.Error("קיימת זכאות פעילה למקום חניה זה , אנה בחר מקום חניה או זכאות שונה");
          }
          else {
            this.upsert();
          }
        }
      )
    }
  }

  upsert() {
    if(this.params.untilDate){
      this.params.untilDate.setDate( this.params.untilDate.getDate() + 1 );
    }
    this.apiService.buildData('upsert_entitlement', this.params).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
          this.afterSubmit.emit({ res: true, date: this.form1.get('untilDate')?.value });
          this.initForm();
        }
      }
    )
  }
}
