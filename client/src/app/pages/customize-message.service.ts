import { ElementRef, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class CustomizeMessageService {

  private loaderSubject = new Subject<MessageState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  success(msg?: string,) {
    this.loaderSubject.next(<MessageState>{ show: true, msg: msg, type: 'success'});
  }
  Error(msg?: string) {
    this.loaderSubject.next(<MessageState>{ show: true, msg: msg, type: 'error' });
  }
  Info(msg?: string) {
    this.loaderSubject.next(<MessageState>{ show: true, msg: msg, type: 'info' });
  }
  Warn(msg?: string) {
    this.loaderSubject.next(<MessageState>{ show: true, msg: msg, type: 'warn' });
  }

}

export interface MessageState {
  show: boolean;
  type: string;
  msg: string;

}