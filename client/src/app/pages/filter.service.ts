import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../core/data/api.service';
import { WaitingParking } from '../models/WaitingParking.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  data: WaitingParking[] = [];
  constructor(private apiService: ApiService, private http: HttpClient) { }

  getData() {
    this.apiService.buildData('get_all_data_with_waitingParking', null).subscribe(
      data => {
        this.data = data[0];
      },
      error => {
        console.log(error);
      }
    )
  }
  getCustomersMini() {
    return Promise.resolve(this.getData());
  }

  getCustomersSmall() {
    return Promise.resolve(this.getData());
  }

  getCustomersMedium() {
    return Promise.resolve(this.getData());
  }

  getCustomersLarge() {
    return Promise.resolve(this.getData());
  }

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  }

  getCustomers(params?: any) {
    return this.http.get<any>('https://www.primefaces.org/data/customers', { params: params }).toPromise();
  }
}
