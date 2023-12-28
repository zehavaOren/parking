import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { MainComponent } from '../main/main.component';
import { PanelMenuModule } from 'primeng/panelmenu';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    TabMenuModule,
    ToolbarModule, ButtonModule, MenuModule, MenubarModule, SidebarModule, InputTextModule,
    PanelMenuModule
  ]
})
export class MainModule { }
