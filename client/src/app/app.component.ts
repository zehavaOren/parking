import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { CustomizeMessageService, MessageState } from './pages/customize-message.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent {
  constructor(private translate: TranslateService,
    private route: Router,
    private config: PrimeNGConfig
    , private messageService: MessageService, private loaderService: CustomizeMessageService) {
    this.translate.setDefaultLang('he');
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }




  ngOnInit() {
    this.loaderService.loaderState.subscribe((state: MessageState) => {
      if (state.show) {
        this.messageService.add({ severity: state.type, summary: state.type, detail: state.msg });
        setTimeout(() => {
        this.messageService.clear();
        },3000);
      }
    });
  }
}
