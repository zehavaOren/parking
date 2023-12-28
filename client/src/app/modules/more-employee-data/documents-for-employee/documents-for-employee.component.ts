import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/data/api.service';
import { DocumentsForEmploeey } from 'src/app/models/DocumentsForEmploeey.models';
import { Option } from 'src/app/pages/option';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'jer-documents-for-employee',
  templateUrl: './documents-for-employee.component.html',
  styleUrls: ['./documents-for-employee.component.scss']
})
export class DocumentsForEmployeeComponent implements OnInit {
id:number=89;
newId:number=0;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.httpHeaders.set('withCredentials', 'true');
    this.getData();

  }
  display: boolean = false
  display1: boolean = false
  uploadedFiles: any;

  pdfSrc = "";


  EmployeeSubscriptionsColumns: (Option & { link?: boolean })[] = [
    { key: 'id', value: ' מס מסמך ' },
    { key: 'type', value: 'סוג מסמך' },
    { key: 'description', value: 'תיאור מסמך' },
    { key: 'link', value: ' לינק', link: true },
    { key: 'attachedBy', value: ' צורף ע"י' }

  ];

  // httpHeaders = { headers: this.apiService.headersOptions, withCredentials: true };

  httpHeaders: HttpHeaders = new HttpHeaders();



  showDialog() {
    this.display = true
  }
  showDialog1() {
    this.display1 = true
  }

  show(item: any) {
    this.apiService.post('File/ReadFile', { path: item.link }).subscribe(
      data => {
        
        if (data) {
      this.printPdf(data.base64);
   
        }
      },
      err => {
        
        console.log('err', err);
      });

  }

printPdf(d:any) {
  
  //let json: any =  { "type":"Buffer", "data":this.blob }
  //let bufferOriginal = Buffer.from(json.data);
  const byteArray = new Uint8Array(
    atob(d)
      .split("")
      .map(char => char.charCodeAt(0))
  );
  const file = new Blob([byteArray], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);
  this.pdfSrc = fileURL;
  window.open(fileURL);
}


delete(item:any){
  // [sp_prk_]
  this.apiService.buildData('delete_document', { id: item.id }).subscribe(
    res => {
      const myRes = res[0][0];
      // if (myRes.status) {
      //   this.customizeMessageService.success(myRes.msg)
      //   this.getData();
      //   this.disabledDelete=true;
      // }
      // else {
      //   this.customizeMessageService.Error(myRes.msg)
// }
  },
  error => {
    console.log(error);
  }
)


}
  data: any[] = [];
  public document: DocumentsForEmploeey[] = [];

  getData() {
    this.apiService.buildData('get_all_data_with_documents_for_employee', { id: this.id }).subscribe(
      data => {
        this.data = data;
        if (this.data?.length) {
          this.document = this.data[0];

        }


      },
      error => {
        console.error(error);
      }
    );
  }

  get url() { return `${environment.apiEndpoint}UploadFiles`; }
}


