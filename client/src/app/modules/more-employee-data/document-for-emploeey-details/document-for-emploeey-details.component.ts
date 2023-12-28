import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Checkbox } from 'primeng/checkbox';
import { FileUpload } from 'primeng/fileupload';
// import { FileUpload } from 'primeng/fileupload';
import { distinctUntilChanged, forkJoin, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/data/api.service';
import { DocumentsForEmploeey } from 'src/app/models/DocumentsForEmploeey.models';
import { CustomizeMessageService } from 'src/app/pages/customize-message.service';
import { Option } from 'src/app/pages/option';

@Component({
  selector: 'jer-document-for-emploeey-details',
  templateUrl: './document-for-emploeey-details.component.html',
  styleUrls: ['./document-for-emploeey-details.component.scss']
})
export class DocumentForEmploeeyDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload: any = null;
  form1: FormGroup = new FormGroup({});
  linkString: string = "fkjhf";
  iff: boolean = false;
  @Input()
  currentID: number = 0;
  @Input()
  currentDoc: DocumentsForEmploeey = new DocumentsForEmploeey();
  pdfSrc = "";
  subscription: Subscription = new Subscription();

  constructor(private messageService: MessageService, private customizeMessageService: CustomizeMessageService, private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.initForm();
    this.getTablesCode();
  }




  initForm() {
    this.form1 = this.fb.group({
      type: [null],
      description: [null],
      myFile: [null],
    });


    if (this.currentDoc?.id) {
      this.form1.patchValue(this.currentDoc);
      this.iff = true;

    }

    this.valeChanges();

  }

  valeChanges() {
    this.subscription.add(this.form1.get('type')?.valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      if (value) {
        this.check(value);
      }
    }));
  }


  onUpload(event: any) {

    if (this.currentDoc.id) {
      this.deleteDoc();
    }
    event.originalEvent.body = event.originalEvent.body.map((p: any) => ({ key: p }));
    this.linkString = event.originalEvent.body[0].key;


  }
  get label() {

    return (this.currentDoc.type === 0) ? "בחר קובץ " : "בחר קובץ אחר";

    return "dghw"

  }
  deleteDoc() {
    
    this.apiService.post('File/ChangeFile', { path: this.currentDoc.link }).subscribe(
      data => {
        

      },
      err => {
        console.log('err', err);
      });


  }
  onSelect() {
    

  }

  saveForm(loadFile = false) {
    if (!loadFile) {
      this.fileUpload?.upload();
    } else {
      
      let document: DocumentsForEmploeey = new DocumentsForEmploeey();
      document.identityNumber = 89;
      document.attachedBy = 2;
      document.link = this.linkString;
      document.description = this.form1.get("description")?.value
      document.type = this.form1.get("type")?.value;

      this.apiService.buildData('upsert_document', document).subscribe(
        res => {
          
          if (res[0][0].status) {
          this.customizeMessageService.success(res[0][0].msg)


          }
          else {
            this.customizeMessageService.Error(res[0][0].msg)
          }
        }
      )
    }
  }

  check(value: number) {
    this.apiService.buildData('checking_has_document', { identityNumber: this.currentID, documentType: value }).subscribe(
      res => {

        if (res[1][0].column2 == 1) {
          this.customizeMessageService.Warn(res[1][0].column1)


        }

      }
    )
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

  uploadFile(event: any) {

    if (this.currentDoc.id) {
      this.deleteDoc();
    }

    if (!event.files?.length) {
      //TODO 
      return;
    }
    const file = event.files[0];
    const parmas = new FormData();
    parmas.append('file', file);
    this.apiService.formData('File/UploadFile', parmas).subscribe((res: string[] | any) => {
      this.linkString = res[0];
      
      this.saveForm(true);
    })
  }


  printPdf(d: any) {
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

  optionsList: Array<Option[]> = [];

  getTableCode(tableNo: number, orderBy = false): Observable<Option[]> {
    return this.apiService.buildData('get_options_by_table', { tableNo });
  }

  getTablesCode() {
    const types = this.getTableCode(8);

    forkJoin([types]).subscribe((res: any) => {
      this.optionsList = res.map((x: [Option[]]) => x[0]);

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

