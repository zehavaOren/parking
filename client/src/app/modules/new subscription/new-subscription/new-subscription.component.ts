import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { distinctUntilChanged, forkJoin, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/data/api.service';
import { Option } from 'src/app/pages/option';
import { Response } from 'src/app/models/Response.models';


@Component({
  selector: 'jer-new-subscription',
  templateUrl: './new-subscription.component.html',
  styleUrls: ['./new-subscription.component.scss']
})
export class NewSubscriptionComponent implements OnInit {

  form: FormGroup = new FormGroup({})
  newSubscriptions: Subscription = new Subscription();
  optionsList: Array<Option[]> = [];
  @Input() parkingSpace: number | undefined = 0

  @Output() afterAddNew: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.initForm();
    this.getTablesCode();
    this.parkingSpaceChanges();
  }

  initForm() {
    this.form = this.fb.group({
      newSubscriptionsNumber: [null, Validators.required],
      parkingSpace: [this.parkingSpace, Validators.required],
      //  newAltenateSubscribersNumber:[null]
    });
    this.form.controls['parkingSpace'].setValue(this.parkingSpace);
    this.form.get("parkingSpace")?.patchValue(this.parkingSpace);
  }

  parkingSpaceChanges() {
    this.newSubscriptions.add(this.form.get('parkingSpace')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value === 1) {
        this.form.addControl('newAltenateSubscribersNumber', new FormControl(null))
      } else {
        this.form.removeControl('newAltenateSubscribersNumber');
      }
      // if (value === 2) {
      //   this.form.addControl('sticker', new FormControl(null, Validators.required))
      // } else {
      //   this.form.removeControl('sticker');
      // }
    }));
  }

  saveNewSubscriber() {
    let params = this.form.getRawValue();
    this.apiService.buildData('upsert_subscriptions', params).subscribe(
      result => {
        const res: Response = result[0][0];
        if (res.status) {
          let sendDataToFather = {
            finish: true,
            subscriptionsNumber: res.output,
            parkingSpace: params.parkingSpace,
            altenateSubscribersNumber: params.newAltenateSubscribersNumber
          }
          this.afterAddNew.emit(sendDataToFather);
        }
        else {
          console.log("error");      
        }
      }
    )
    this.form.patchValue({
      newSubscriptionsNumber: null,
      parkingSpace: null,
      newAltenateSubscribersNumber: null
    })
  }

  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const parkingSpaces = this.getTableCode(3);
    forkJoin([parkingSpaces]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);
    });

  }

}
