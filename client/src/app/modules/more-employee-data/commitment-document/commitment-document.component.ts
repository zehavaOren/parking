import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DROPDOWN_VALUE_ACCESSOR } from 'primeng/dropdown';
import { ApiService } from 'src/app/core/data/api.service';
// import jsPDF from "jspdf";
// import "jspdf-autotable";

@Component({
  selector: 'jer-commitment-document',
  templateUrl: './commitment-document.component.html',
  styleUrls: ['./commitment-document.component.scss']
})
export class CommitmentDocumentComponent implements OnInit {
  @Input()
  currentID: number = 0;
   name="";
   lastName="";
   wing="";
   pdfSrc = "";

   @ViewChild('content')body:any = undefined;
   constructor( private apiService: ApiService) { }

  ngOnInit(): void {
   this. getData();  
  }

  data: any[] = [];

  getData() {

  
    this.apiService.buildData('get__employeey_details_for_commitment_document', { identityNumber: this.currentID }).subscribe(
      data => {
        this.data = data;        
        if (this.data?.length) {
          this.name=this.data[0][0].firstName;
          this.lastName=this.data[0][0].lastName;
          this.wing=this.data[0][0].wing;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  exportPdf() {
  }

  


  create() {      
      const string1 = this.body.nativeElement.innerHTML;
    this.down(string1)
    
}

down( string1:string){
  
  this.apiService.post('File/CreateFile', { path:string1 }).subscribe(
    data => {
      if (data) {
        this.downloadPdf(data);
        // this.printPdf(data.base64);

      }
    },
    err => {
      
      console.log('err', err);
    });
}





// printPdf(d: any) {
  
//   const byteArray = new Uint8Array(
//     window.atob(d)
//       .split("")
//       .map(char => char.charCodeAt(0))
//   );
//   const file = new Blob([byteArray], { type: "application/pdf" });
//   const fileURL = URL.createObjectURL(file);
//   this.pdfSrc = fileURL;
//   window.open(fileURL);
// }



downloadPdf(d: any){

    const byteArray = new Uint8Array(window.atob(d).split('').map(char => char.charCodeAt(0)));
    var blob = new Blob([byteArray], { type: "application/pdf" });
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download ="commitment_document";
      link.click();

}


}
