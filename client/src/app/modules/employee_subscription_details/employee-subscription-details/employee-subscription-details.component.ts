import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/data/api.service';
import { Option } from 'src/app/pages/option';
import { EmployeeSubscriptionsAllDatails } from 'src/app/models/EmployeeSubscriptionsAllDatails.models'
import { distinctUntilChanged, forkJoin, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';
import { MessageService } from 'primeng/api';
import { FunctionService } from 'src/app/core/data/function.service';

@Component({
  selector: 'jer-employee-subscription-details',
  templateUrl: './employee-subscription-details.component.html',
  styleUrls: ['./employee-subscription-details.component.scss']
})
export class EmployeeSubscriptionDetailsComponent implements OnInit, OnDestroy {

  allsubscribers: Option[] = [];
  departments: Option[] = [];
  showConfirmDel: boolean = false;
  hasAlternative: boolean = true;
  form1: FormGroup = new FormGroup({})
  checked_updateInParkingSubscriptionSystem: boolean = false;
  id: number = 0;
  flag: boolean = false;
  subscriptions: Subscription = new Subscription();
  visible: boolean = false;
  parking: number = 0;
  data: any;
  newId: number=0;
  EmployeeSubscriptionsAllDatails: EmployeeSubscriptionsAllDatails = new EmployeeSubscriptionsAllDatails();
  optionsList: Array<Option[]> = [];
  @Output() afterSubmit: EventEmitter<boolean> = new EventEmitter();
  @Input()
  currentSub: number = 0;
  toDelete: boolean = false;
  @Input()
  eligibilityWaive: any;

  selectDb: Option[] = [
    { key: 'parking space', value: 'מקום חניה' },
    { key: 'employee entitlement', value: 'זכאות עובד' },
    { key: 'Participation fee', value: 'דמי השתתפות' },
    { key: 'Expiry date charge', value: 'חיוב תאריך תפוגה' },
    { key: 'from date', value: 'מתאריך' },
    { key: 'until date', value: 'עד תאריך' },
    { key: 'editing', value: 'עריכה' }

  ];

  constructor(private customizeMessageService: CustomizeMessageService, private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router, private functionService: FunctionService) { }

  ngOnInit(): void {

    this.functionService.setTitle.next(null);
    this.route.queryParams.subscribe(params => {
      this.id = +params['identityNumber'];
      
    });
    this.getTablesCode();
    this.initForm();
    this.valueChanges();

    if (this.currentSub != 0 || this.id) {
      this.getDataById();
    }
    this.getAllSubscribers();
  }

  initForm(e?: any) {
    if (this.currentSub===0){

      this.newId=this.id
    }
    else{
      this.newId=this.currentSub

    }
    

    this.form1 = this.fb.group({
      identityNumber: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      // wing: [null],
      job: [null, Validators.required],
      jobTitle: [null, Validators.required],
      // departmentId: [null],
      parkingSpace: [null, Validators.required],
      updateInParkingSubscriptionSystem: [null],
      isMunicipalityEmployee: [null, Validators.required],
      statusOrEligibility: [null, Validators.required],
      subscriptionsNumber: [null, Validators.required],
      // locationOutsideTheSquare: [null],
      participationFee: [{ value: null, disabled: true }, Validators.required],
      carNumber: [null, Validators.required],
      deductionFromSalary: [null, Validators.required],
      // monthlyParkingFee: [null],
      subscriptionsCardWasProduced: [null, Validators.required],
      // subscriptionsCardHasBeenReturned: [null],
      startDate: [null, Validators.required],
      expiryDate: [null, Validators.required],
      notes: [null],
      status: [null, Validators.required],
      statusDate: [null, Validators.required],
      registeredBy: [null, Validators.required],
      alternateparkingSpace: [null],
    });
  }

  valueChanges() {
    this.isMunicipalityEmployeeChange();
    this.parkingSpaceChanges();
    this.expityDateChange();
    this.statusOrEligibilityChange();
  }

  expityDateChange() {
    this.subscriptions.add(this.form1.get('expiryDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value <= Date.now()) {
        this.form1.addControl('subscriptionsCardHasBeenReturned', new FormControl(null));
      }
      else {
        this.form1.removeControl('subscriptionsCardHasBeenReturned');
      }
    }))
  }

  statusOrEligibilityChange() {
    this.subscriptions.add(this.form1.get('statusOrEligibility')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      const parking = this.form1.get('parkingSpace')?.value;
      if (parking && value) {
        this.getEntitmentDetails(parking, value);
      }
      else {
        this.customizeMessageService.Info("שינוי אחד מהערכים מקום חניה ו/או מעמד/ זכאות יביא לשינוי דמי השתתפות ותאריכי התחלת וסיום המנוי");
      }

      return;
    }));
  }

  getEntitmentDetails(parking: number, statusOrEligibility: number) {

    const param = {
      'parkingSpace': parking,
      'statusOrEligibility': statusOrEligibility
    };
    this.apiService.buildData('get_entitlement_by_details', param).subscribe(
      data => {
        this.data = data;
        if (this.data[1][0].status) {
          this.form1.get('participationFee')?.setValue(this.data[0][0].participationFee);
          this.form1.get('startDate')?.setValue(new Date(this.data[0][0].startDate));
          this.form1.get('expiryDate')?.setValue(new Date(this.data[0][0].expiryDate));
        }
        else {
          this.customizeMessageService.Info("שים לב: לא קיימים נתוני זכאות במערכת");
          this.form1.get('participationFee')?.setValue(null);
          this.form1.get('startDate')?.setValue(null);
          this.form1.get('expiryDate')?.setValue(null);
        }
      }
    )

  }

  parkingSpaceChanges() {
    this.subscriptions.add(this.form1.get('parkingSpace')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      const statusOrEligibility = this.form1.get('statusOrEligibility')?.value;
      if (statusOrEligibility && value) {
        this.getEntitmentDetails(value, statusOrEligibility);
      }
      else {
        this.customizeMessageService.Info("שינוי אחד מהערכים מקום חניה ו/או מעמד/ זכאות יביא לשינוי דמי השתתפות ותאריכי התחלת וסיום המנוי");
      }
      if (value === 1) {
        this.form1.addControl('altenateSubscribersNumber', new FormControl(null))
      } else {
        this.form1.removeControl('altenateSubscribersNumber');
      } if (value === 2) {
        this.form1.addControl('sticker', new FormControl(null))
      } else {
        this.form1.removeControl('sticker');
      }
      if (value === 3) {
        this.form1.addControl('locationOutsideTheSquare', new FormControl(null));
        this.form1.addControl('monthlyParkingFee', new FormControl(null))
      }
      else {
        this.form1.removeControl('locationOutsideTheSquare');
        this.form1.removeControl('monthlyParkingFee');
      }
    }));
  }

  isMunicipalityEmployeeChange() {
    this.subscriptions.add(this.form1.get('isMunicipalityEmployee')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value == true) {
        this.form1.addControl('wing', new FormControl());
        this.form1.addControl('departmentId', new FormControl());
        this.wingChange();
      }
      else {
        this.form1.removeControl('wing');
        this.form1.removeControl('departmentId');
      }
    }));
  }

  wingChange(wing?: number, depattment?: number) {
    this.subscriptions.add(this.form1.get('wing')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      (value) ? this.departments = this.optionsList[4].filter(x => x.subKey === value) : [];
    }));
  }

  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const wing = this.getTableCode(1);
    const departmentId = this.getTableCode(2);
    const parkingSpaces = this.getTableCode(3);
    const statuses = this.getTableCode(4);
    const stausOrEligabilitys = this.getTableCode(5);
    const locationOut = this.getTableCode(6);

    forkJoin([wing, parkingSpaces, statuses, stausOrEligabilitys, departmentId, locationOut]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);
    });
    
  }

  getAllSubscribers(defaultVal?: number, defaultVal2?: string) {
    this.apiService.buildData('get_subscribers_only', { id: defaultVal }).subscribe(
      data => {
        this.data = data;
        this.allsubscribers = this.data[0];
        if (defaultVal) {
          this.form1.get('subscriptionsNumber')?.setValue(defaultVal);
          this.form1.get('altenateSubscribersNumber')?.setValue(defaultVal2);
        }
      },
      error => {
        console.error(error);
      }
    );

  }

  getDataById() {
    let param = this.id || this.currentSub;
    
    this.apiService.buildData('get_subscribers_and_employees_all_details_with_identity_num', { identityNumber: param }).subscribe(
      data => {
        this.data = data;
        this.EmployeeSubscriptionsAllDatails = this.data[0][0];
        if (this.EmployeeSubscriptionsAllDatails?.identityNumber != null || this.EmployeeSubscriptionsAllDatails?.firstName != null) {
          this.form1.patchValue(this.EmployeeSubscriptionsAllDatails);
          this.form1.get('wing')?.setValue(this.EmployeeSubscriptionsAllDatails.wing);
          this.form1.get('departmentId')?.setValue(this.EmployeeSubscriptionsAllDatails.departmentId);
          if (this.data[2][0]) {
            this.form1.patchValue(this.data[2][0]);
            this.flag = true;
          }
          else {
            if (this.data[1][0]) {
              this.toDelete = true;
            }
          }
          if (this.data[1].length != 0) {
            this.form1.controls['parkingSpace'].setValue(this.data[1][0].parkingSpace);
          }
          const id1: number = this.EmployeeSubscriptionsAllDatails?.subscriptionsNumber;
          const id2: string = this.EmployeeSubscriptionsAllDatails?.altenateSubscribersNumber;
          this.getAllSubscribers(id1, id2);
        }
        else {
          let bool: string = "true";
          this.route.queryParams.subscribe(params => {
            bool = params['check'];
          });
          if (bool != "false") {
            this.getSubsData();
          }
          else {
            const emp = localStorage.getItem("employee");
            if (emp) {
              let employee = JSON.parse(emp);
              this.form1.patchValue(employee);
              this.form1.get("parkingSpace")?.patchValue(employee.parkingSpace);
            }
            this.router.navigate(['EmployeeSubscriptions'], {});
          }

        }
      },
      error => {
        console.error(error);
      }
    );

  }

  deleteEligibilityWaive(event: any) {
    this.apiService.buildData('delete_eligibility_waive', { id: event }).subscribe(
      res => {
        const myRes = res[0][0];
        if (myRes.status) {
          this.customizeMessageService.success(myRes.msg)
        }
        else {
          this.customizeMessageService.Error(myRes.msg)
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubsData() {
    this.apiService.buildData('checking_subscription_option', { identityNumber: this.currentSub, id: this.currentSub }).subscribe(
      data => {
        if (data[3][0].status) {
          this.customizeMessageService.success(data[2][0].alert);

        }
        else {
          this.customizeMessageService.Info("עובד זה לא קיים בממתינים לאישור, אנא הכנס את הנתונים לשם");
          this.router.navigate(['../WaitingConfirmation'], { queryParams: { identityNumber: this.form1.controls['identityNumber'].value }, relativeTo: this.route });
        }
      });
  }

  saveForm() {
    let params = { ...this.form1.getRawValue(), id: this.id };
    this.apiService.buildData('upsert_employee_and_employee_subscriptions', params).subscribe(
      res => {
        if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg);
          if (res[0][0].sendEmail) {
            this.deleteConfirm(res);
          }
          else {
            this.afterSubmit.emit(true);
          }
          if (this.id) {
            this.router.navigate(['EmployeeSubscriptions'], { queryParams: {} });
          }
        }
        else {
          this.customizeMessageService.Error(res[0][0].msg)

        }
      }
    )
    if (this.toDelete) {
      this.deleteWaitingConfirmation(params.identityNumber);
    }
    if (this.flag) {
      this.deleteEligibilityWaive(this.EmployeeSubscriptionsAllDatails.identityNumber);
      this.flag = true;
    }
  }

  afterAddNew(e: any) {
    this.visible = false;
    this.form1.patchValue(e);
    this.getAllSubscribers(e.subscriptionsNumber, e.altenateSubscribersNumber);

  }

  showDialog() {
    this.visible = true;
    this.parking = this.form1.controls['parkingSpace'].value;
  }

  deleteWaitingConfirmation(id: number) {
    this.apiService.buildData('delete_waiting_confirmation', { id: id }).subscribe(
      res => {
        const myRes = res[0][0];
        if (myRes.status) {
          this.customizeMessageService.success(myRes.msg)
        }
        else {
          this.customizeMessageService.Error(myRes.msg)
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deleteConfirm(item: any) {
    this.showConfirmDel = true;
  }

  sendEmail(e: boolean) {
    let params = { ...this.form1.getRawValue() };
    var email = `mailto:someone@example.com?cc=someoneelse@example.com&
    bcc=andsomeoneelse@example.com&
    subject=מנוי חדש&
    body=שלום רב,
    במסגרת הקריטריונים להקצאת מנויי חניה נקבע כי למנהלי התחום יערך "מבחן שקלול" (ותק במשרה, ותק בעירייה וגיל), ועל-פיו יינתן מנוי חניה במגרש הרוסים.
    לאחרונה, ביצענו לכל מנהלי התחום "מבחן שקלול" עדכני, ונמצא/ה זכאי/ת חדש/ה: ${params.identityNumber + " " + params.firstName + " " + params.lastName}`;
    window.location.href = email;
    this.showConfirmDel = false;
    this.afterSubmit.emit(true);
  }

  cancelEmail() {
    this.showConfirmDel = false;
    this.afterSubmit.emit(true);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get isMunicipalityEmployee() { return this.form1.get('isMunicipalityEmployee'); }

  get subscribersFilter() { return this.allsubscribers.filter(x => x.subKey === this.form1.get('parkingSpace')?.value); }
}
