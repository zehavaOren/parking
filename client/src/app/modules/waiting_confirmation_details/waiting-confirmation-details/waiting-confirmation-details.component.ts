import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, forkJoin, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/data/api.service';
import { FunctionService } from 'src/app/core/data/function.service';
import { WaitingConfirmation } from 'src/app/models/WaitingConfirmation.models';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';
import { Option } from 'src/app/pages/option';
import { __param, __values } from 'tslib';

@Component({
  selector: 'jer-waiting-confirmation-details',
  templateUrl: './waiting-confirmation-details.component.html',
  styleUrls: ['./waiting-confirmation-details.component.scss']
})
export class WaitingConfirmationDetailsComponent implements OnInit {

  form1: FormGroup = new FormGroup({})
  subscriptions: Subscription = new Subscription();
  departments: Option[] = [];
  wing:boolean=false;
  department:boolean=false;
  WaitingConfirmation: WaitingConfirmation = new WaitingConfirmation();
  w: WaitingConfirmation = new WaitingConfirmation();
  optionsList: Array<Option[]> = [];
  data: any;
  @Input()
  cid: number = 0;
  @Input()
  id: number = 0;
  @Input()
  current_entitlement: number = 0;
  @Output() afterSubmit: EventEmitter<boolean> = new EventEmitter();

  constructor(private customizeMessageService: CustomizeMessageService,private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private rout: Router, private functionService: FunctionService) { }

  ngOnInit(): void {
    this.functionService.setTitle.next(null);
    this.initForm();
    this.getTablesCode();    
    if(this.cid!=0){
      this.getDataById();
    }
    else{
       this.getID();
    }
  }

  getID() {
    this.route.paramMap.subscribe((data) => {
      if (data.get('identityNumber') != null) {
        this.id = Number(data.get('identityNumber'));
      }
    });
    this.form1.controls['identityNumber'].setValue(this.id);
    this.rout.navigate(['WaitingConfirmation']);
  }

  initForm() {
    this.form1 = this.fb.group({
      identityNumber: [null, Validators.required],
      lastName: [null,Validators.required],
      firstName: [null,Validators.required],
      //wing: [null],
      department: [null],
      job: [null,Validators.required],
      jobTitle: [null,Validators.required],
      status: [null,Validators.required],
      statusOrElogibility: [null,Validators.required],
      parkingSpace: [null,Validators.required],
      isMunicipalityEmployee: [null]
    });
    this.isMunicipalityEmployeeChange();
  }
  
  saveForm() {
    
    const params = this.form1.getRawValue();
    if(params.isMunicipalityEmployee==null){
      params.isMunicipalityEmployee=false;
    }
    this.apiService.buildData('upsert_waiting_confirmation', params).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
        }
        else{
          this.customizeMessageService.Error(res[0][0].msg);
        }
      }
    )
    this.afterSubmit.emit(true);
    this.initForm();
  }
  
  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const wings = this.getTableCode(1);
    const departments = this.getTableCode(2);
    const parkingSpaces = this.getTableCode(3);
    const stausOrEligabilitys = this.getTableCode(5);
    const status = this.getTableCode(4);
    forkJoin([wings, departments, parkingSpaces, stausOrEligabilitys, status]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);
    });
  }

  getDataById() {
    this.apiService.buildData('get_data_with_waitingConfirmation_by_indentiyNumber', { identityNumber: this.form1.controls['identityNumber'].value }).subscribe(
      data => {
        
        this.data = data;
        this.WaitingConfirmation = this.data[0][0];
        this.w=this.WaitingConfirmation;
        this.form1.patchValue(this.WaitingConfirmation);       
      },
      error => {
        console.error(error);
      }
    );
  }

  isMunicipalityEmployeeChange() {
    this.subscriptions.add(this.form1.get('isMunicipalityEmployee')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value == true) {
        this.form1.addControl('wing', new FormControl());
        this.form1.addControl('departmentId', new FormControl());
        this.wingChange(this.w);
      }
      else {
        this.form1.removeControl('wing');
        this.form1.removeControl('departmentId');
      }
    }));
  }

  wingChange(w?:WaitingConfirmation) {
    this.subscriptions.add(this.form1.get('wing')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      
      (value) ? this.departments = this.optionsList[1].filter(x => x.subKey === value) : [];
    }));

    // let param = this.form1.getRawValue().isMunicipalityEmployee;
    // if (param) {
      // this.department=true;
      // this.wing=true;
      // this.form1.addControl('wing', new FormControl(null));
      if(w){
        this.getTablesCode();
        this.form1.controls['wing'].setValue(w.wing);
        this.form1.controls['department'].setValue(w.department);
        // this.form1.patchValue(w);
      }
      // this.form1.addControl('department', new FormControl(null));
      // this.subscriptions.add(this.form1.get('wing')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      //   (value) ? this.departments = this.optionsList[1].filter(x => x.subKey === value) : [];
      // }))
    // }
    // else {
    //   this.form1.removeControl('wing');
    // }
    // if(w){
    //   this.form1.patchValue(w);
    // }
  }
  
}