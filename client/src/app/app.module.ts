import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataModule } from './core/data/data.module';
import { DirectivesModule } from './directives/directives.module';
import { MainModule } from './pages/main/main.module';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { ShareModule } from './core/share/share.module';
import { SubscribersComponent } from './pages/Subscribers/subscribers/subscribers.component';
import { CustomizeMessageService } from './pages/customize-message.service';
import { primeNgModule } from './core/share/primeNg.module';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DirectivesModule,
    DataModule,
    MainModule,
    AppRoutingModule,
    TableModule,
    AccordionModule,
    ShareModule,
    primeNgModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [MessageService, CustomizeMessageService,
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}
