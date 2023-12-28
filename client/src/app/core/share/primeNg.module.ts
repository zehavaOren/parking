import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { SplitterModule } from 'primeng/splitter';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [],
  imports: [
    TableModule,
    ButtonModule,
    CalendarModule,
    SplitterModule,
    CardModule,
    ScrollPanelModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    InputSwitchModule,
    TableModule,
    MenuModule,
    TabMenuModule

  ],
  exports: [
    TableModule,
    ButtonModule,
    CalendarModule,
    SplitterModule,
    CardModule,
    ScrollPanelModule,
    DialogModule,
    FileUploadModule,
    ToastModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    InputSwitchModule,
    TableModule,
    MenuModule,
    TabMenuModule
  ]
})
export class primeNgModule { }
