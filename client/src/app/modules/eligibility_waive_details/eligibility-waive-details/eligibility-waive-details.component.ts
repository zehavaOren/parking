import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ApiService } from 'src/app/core/data/api.service';
import { EligibilityWaive } from 'src/app/models/EligibilityWaive.models';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';
import { Option } from 'src/app/pages/option';


@Component({
  selector: 'jer-eligibility-waive-details',
  templateUrl: './eligibility-waive-details.component.html',
  styleUrls: ['./eligibility-waive-details.component.scss']
})
export class EligibilityWaiveDetailsComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  optionsList: Array<Option[]> = [];
  subscriptions: Subscription = new Subscription();
  departments: Option[] = [];
  eligibilityWaive: EligibilityWaive = new EligibilityWaive();
  @Input()
  ewid: number = 0;
  @Output() afterSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(private apiService: ApiService, private fb: FormBuilder, private customizeMessageService: CustomizeMessageService) { }

  ngOnInit(): void {
    this.initForm();
    this.getTablesCode();
  }

  initForm() {
    this.form = this.fb.group({
      identityNumber: [null, Validators.required],
      lastName: [null, Validators.required],
      firstName: [null, Validators.required],
      //wing: [null],
      department: [null],
      job: [null, Validators.required],
      jobTitle: [null, Validators.required],
      statusOrEligibility: [null, Validators.required],
      parkingSpace: [null, Validators.required],
      isMunicipalityEmployee: [null],
      reasonRejection: [null, Validators.required],
      dateAdded: [new Date(), Validators.required]
    });
    if (this.ewid) {
      this.getDataById();
    }
    this.isMunicipalityEmployeeChange();
  }

  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const wings = this.getTableCode(1);
    const departments = this.getTableCode(2);
    const parkingSpaces = this.getTableCode(3);
    const stausOrEligabilitys = this.getTableCode(5);
    const reasonRejection = this.getTableCode(9);
    forkJoin([wings, departments, parkingSpaces, stausOrEligabilitys, reasonRejection]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);
      this.departments = this.optionsList[1].filter(x => x.subKey === this.form.get('wing')?.value)

    });
  }

  isMunicipalityEmployeeChange() {
    this.subscriptions.add(this.form.get('isMunicipalityEmployee')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value == true) {
        this.form.addControl('wing', new FormControl());
        this.form.addControl('departmentId', new FormControl());
        this.wingChange();
      }
      else {
        this.form.removeControl('wing');
        this.form.removeControl('departmentId');
      }
    }));
  }

  wingChange() {
    this.subscriptions.add(this.form.get('wing')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      (value) ? this.departments = this.optionsList[1].filter(x => x.subKey === value) : [];
    }));
  }

  saveForm() {
    const params = this.form.getRawValue();
    if (params.isMunicipalityEmployee == null) {
      params.isMunicipalityEmployee = false;
    }
    this.apiService.buildData('upsert_eligibility_waive', params).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
        }
        else {
          this.customizeMessageService.Error(res[0][0].msg);
        }
      }
    )
    this.afterSubmit.emit(true);
  }

  getDataById() {
    if (this.ewid == 0) {
      this.ewid = this.form.get('identityNumber')?.value;
    }
    this.apiService.buildData('get_employee', { identityNumber: this.ewid }).subscribe(
      data => {
        this.eligibilityWaive = data[0][0];
        
        this.form.patchValue(this.eligibilityWaive);
        this.form.get('wing')?.setValue(this.eligibilityWaive.wing);
        this.form.get('department')?.setValue(this.eligibilityWaive.department);
        this.departments = this.optionsList[1].filter(x => x.subKey === this.form.get('wing')?.value)
      },
      error => {
        console.error(error);
      }
    );
  }

}
