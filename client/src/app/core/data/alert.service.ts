import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
    private defaultId = 'default-alert';
    
  constructor() { }
}
