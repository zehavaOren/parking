import { MenuItem } from 'primeng/api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { mainRoutes1, mainRoutes2, titles } from 'src/app/app-routing.module';
import { TranslateService } from '@ngx-translate/core';
import { Routes } from '@angular/router';
import { FunctionService } from 'src/app/core/data/function.service';
import { environment } from 'src/environments/environment';
;

@Component({
  selector: 'jer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @ViewChild('menubar') m: any;
  activeItem: any
  public topBarMenuItems: Array<any> = [];
  public menuItems: Array<MenuItem | any> = [];
  public sidebarIsOpened: boolean = false;
  public isSearch: boolean = false;
  public demoUser = "שלום פרקטיקום"

  toggleSidebar() {
    this.sidebarIsOpened = !this.sidebarIsOpened;
  }

  toggleSearch() {
    this.isSearch = !this.isSearch;
  }

  onSidebarOpen() {
    DomHandler.addClass(document.body, 'p-overflow-hidden');
    DomHandler.addClass(document.body, 'sidebar-opened');
  }

  onSidebarClose() {
    DomHandler.removeClass(document.body, 'p-overflow-hidden');
    DomHandler.removeClass(document.body, 'sidebar-opened');
  }


  constructor(private translate: TranslateService, private functionService: FunctionService) { }

  ngOnInit(): void {
    this.getData();

    this.functionService.setTitle.subscribe(value => {
      this.setTitle();
    });



  }

  async getData() {
    this.menuItems = [
      this.convertToMeneList(mainRoutes1),
      this.convertToMeneList(mainRoutes2)
    ];

    titles.forEach((e, i) => {
      this.topBarMenuItems.push({
        label: titles[i],
        items: [],
      })
      this.getChildren(i);
    });
  }

  convertToMeneList(list: Routes) {
    return list.map(x => ({ label: x?.path, routerLink: x.path }));
  }

  async getChildren(i: number) {
    const pathArr = window.location.hash.split('/');
    const path = pathArr[1];
    const list = this.menuItems[i];
    this.topBarMenuItems[i].items = await Promise.all(list.map(async (x: any) => {
      let p = await this.translate.get(x.label).toPromise();

      if (this.activeItem == undefined && path == x.label) {
        // this.y=true;
        this.activeItem = { ...x, label: p };
      }
      return {
        ...x, label: p,
        command: (event?: any) => this.chooseItem(event.item),
        routerLinkActiveOptions: { exact: false },
        styleClass: 'menucus'
      }
    }));
  }

  chooseItem(item: any) {
    this.activeItem = item;
    this.sidebarIsOpened = false;
  }


  setTitle() {
    const pathArr = window.location.pathname.split('/');
    // const pathArr = window.location.hash.split('/');
    const path = pathArr[1];
    this.topBarMenuItems.forEach(element => {
      const item = element?.items.find((x: any) => x.routerLink === path);
      if (item) {
        this.activeItem = item;
        return;
      }
    });
  }

}
