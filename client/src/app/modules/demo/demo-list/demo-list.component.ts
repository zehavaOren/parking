
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { FunctionService } from 'src/app/core/data/function.service';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';

@Component({
  selector: 'jer-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.scss']
})

export class DemoListComponent implements OnInit {
  products: any[] = [];

  selectedProducts: any[] = [];

  constructor(private func: FunctionService) { }

  cols: any[] = [];

  exportColumns: any[] = [];

  ngOnInit() {

    this.products = this.getProductsData();

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' }
    ];

    this.exportColumns = this.cols.map((col, i) => ({ key: col.field, value: 'עמודה_'+i }));
  }

  getProductsData() {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accessories',
        quantity: 61,
        inventoryStatus: 'OUTOFSTOCK',
        rating: 4
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'LOWSTOCK',
        rating: 3
      },

      {
        id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'INSTOCK',
        rating: 8
      }
    ];
  }

  exportExcel() {
    // this.func.exportExcel(this.products, this.exportColumns, 'test');
    // return;
    // import('xlsx').then((xlsx) => {
    //   const worksheet = xlsx.utils.json_to_sheet(this.products);
    //   const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    //   const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    //   this.saveAsExcelFile(excelBuffer, 'products');
    // });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}