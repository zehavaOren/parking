import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string = `${environment.apiEndpoint}`;
  public get headersOptions(): HttpHeaders {
    const token = localStorage.getItem("token");
    if (token) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` })
    }
    return new HttpHeaders();
  }

  public getList(entity: string="data/", _baseurl: string | null = null): Observable<any> {
    return this.http.get(`${this.baseUrl}${entity}`, { withCredentials:true });
  }
  public get(entity: string, id: number, _baseurl: string | null = null): Observable<any> {
    return this.http.get(`${this.baseUrl}${entity}/${id}`, { headers: this.headersOptions });
  }
  public post(entity: string, obj: any, _baseurl: string | null = null): Observable<any> {
    return this.http.post(`${this.baseUrl}${entity}`, obj, { headers: this.headersOptions, withCredentials:true });
  }
  public put(entity: string, obj: any, _baseurl: string | null = null): Observable<any> {
    return this.http.put(`${this.baseUrl}${entity}`, obj, { headers: this.headersOptions })
  }
  public delete(entity: string, id: number, _baseurl: string | null = null): Observable<any> {
    return this.http.delete(`${this.baseUrl}${entity}/${id}`, { headers: this.headersOptions });
  }
  public formData(url: string, formData: FormData) {
    return this.http.post(`${this.baseUrl}${url}`, formData);
  }
  public getBlob(url: string) {
    return new Observable(observer => {
      this.http.get(`${this.baseUrl}${url}`, { responseType: "blob", withCredentials:true  })
        .subscribe(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            observer.next(reader.result);
          };
        })
    });
  }
  public buildData(task: string, obj: any = null): Observable<any> {
    let post: Observable<any>;
    const params = this.buildParams(obj);
    post = this.http.post(`${this.baseUrl}Data/GetData`, {
      StoredProcedure: task, Params: params,
    }, {  headers: this.headersOptions, withCredentials:true });
    return post.pipe(map(d => d.data));
  } 
  public exportToExcel(task: string, fileName: string, obj: any = null, columns: Array<string> = []) {
    const params = this.buildParams(obj);
    return this.http.post<any>(`${this.baseUrl}Data/ExportToExcel`, {
      StoredProcedure: task, Params: params, columns
    }, { headers: this.headersOptions, responseType: 'blob' as 'json' })
      .pipe(map(res => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(res);
        a.download = fileName;
        a.click();
        return res;
      }));
  }
  private buildParams(obj: any) {
    let ret = [];
    for (const prop in obj) {
      switch (true) {
        case obj[prop] instanceof String:
          ret.push({ ParameterName: prop, Value: obj[prop] })
          break;
        case obj[prop] instanceof Number:
          ret.push({ ParameterName: prop, Value: obj[prop] })
          break;
        case obj[prop] instanceof Boolean:
          ret.push({ ParameterName: prop, Value: obj[prop] })
          break;
        case obj[prop] instanceof Date:
          ret.push({ ParameterName: prop, Value: obj[prop] })
          break;
        case obj[prop] instanceof Array:
          ret.push({ ParameterName: prop, IsTableValue: true, Value: JSON.stringify(obj[prop]) })
          break;
        default:
          ret.push({ ParameterName: prop, Value: obj[prop] })
          break;
      }
    }
    return ret;
  }
  constructor(public http: HttpClient, handler: HttpBackend, private messageService: MessageService, private t: TranslateService) { }
}
