import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, Subject } from 'rxjs';
import { Message } from 'src/app/models/Message.model';
import { Option } from 'src/app/pages/option';
import * as fileSaver from 'file-saver';

declare let Email: any;

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  model: any;
  setTitle = new Subject();

  public baseUrl: string = `${environment.apiEndpoint}`;
  public get headersOptions(): HttpHeaders {
    const token = localStorage.getItem("token");
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }
    return new HttpHeaders();
  }

  constructor(public http: HttpClient) { }

  converDateToString(date: Date): string {
    return `${date?.getMonth()}/${date?.getDate()}/${date?.getFullYear()}`;
  }

  getRow(columns: Option[], x: any): {} {
    let item: any = {};
    columns.forEach(y => {
      item[y.value] = x[y.key]
    });
    return item;
  }

  exportExcel123(data: any[], columns: Option[], fileName: string, download = true): Blob | any {
    const res = data.map(x => columns.map(y => ({ [y.value]: x[y.key] })));
    const res2 = data.map(x => (this.getRow(columns, x)));
    return import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(res2);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      if (download) {
        this.saveAsExcelFile(this.createExcelFile(excelBuffer), fileName);
        return null;
      } else {
        return this.createExcelFile(excelBuffer);
      }
    }).catch(() => {
      return new Blob();
    });
  }

  exportExcel(data: any[], columns: Option[], fileName: string, download = true): Blob | any {
    const res = data.map(x => columns.map(y => ({ [y.value]: x[y.key] })));
    const res2 = data.map(x => (this.getRow(columns, x)));
    return import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(res2);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      if (download) {
        this.saveAsExcelFile(this.createExcelFile(excelBuffer), fileName);
        return null;
      } else {
        return this.createExcelFile(excelBuffer);
      }
    }).catch(() => {
      return new Blob();
    });
    // return new Blob();
  }

  createExcelFile(buffer: any): Blob {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    return data;
  }

  saveAsExcelFile(blob: any, fileName: string): void {
    let EXCEL_EXTENSION = '.xlsx';
    fileSaver.saveAs(blob, fileName + EXCEL_EXTENSION);
  }

  sendEmail(message: Message): Observable<any> {
    let post: Observable<any>;
    post = this.http.post(`${this.baseUrl}SendEmail/SendEmail`, {
      message: message,
    },
      { headers: this.headersOptions, withCredentials: true });
    return post.pipe(map(d => d.data));
  }

  downloadFile(data: any, name: string) {
    const blob = this.base64ToBlob(data.base64, name)
  }

  public base64ToBlob(b64Data: string, name: string, sliceSize = 512) {
    let byteCharacters = atob(b64Data); //data.file there
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); //also tried type: 'application/octet-stream'   
    fileSaver.saveAs(blob, name);
    return blob;
  }
}