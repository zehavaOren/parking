import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'jer-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  providers: [MessageService]
})
export class DeleteComponent implements OnInit {
  dataItem: any
  res: boolean = false;

  @ViewChild('btnShow') btnShow: any;
  @Output() afteronConfirm: EventEmitter<boolean> = new EventEmitter();
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.res = false;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.btnShow?.nativeElement.click();
    }, 300);
  }

  show() {
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'האם אתם בטוחים?', detail: 'אשר כדי להמשיך' });
  }
  onReject() {
    this.messageService.clear('c');
    this.cancel.emit();
  }
  onConfirm() {
    this.res = true;
    this.messageService.clear('c');
    this.confirm.emit(true);
  }
}




