import { Component, ViewChild } from '@angular/core';
import { DbToolsService } from '../db-tools.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportResultsDialogComponent } from '../import-results-dialog/import-results-dialog.component';
import { first } from 'rxjs';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-db-import',
  templateUrl: './db-import.component.html',
  styleUrls: ['./db-import.component.scss'],
  providers: [DialogService, MessageService],

})
export class DbImportComponent {

  ref: DynamicDialogRef | undefined;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  constructor(
    private reader: FileReader, 
    private toolsService: DbToolsService,
    public dialogService: DialogService,
    private messageService: MessageService) { 

      toolsService.importErrors$.pipe(first()).subscribe(errors=>{
        this.ref = this.dialogService.open(ImportResultsDialogComponent, { 
          data: errors,
          header: 'Import Results',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });
      });

      //this.fileUpload = new FileUpload()
    }

  onUpload(evnt: any) {
    console.log(evnt)
    const fileToUpload = evnt.files[0]
    this.reader.onload = this.handleFileLoad.bind(this);
    this.reader.readAsText(fileToUpload);
  }

  uploadHandler(evnt: any) {
    console.log(evnt)
    const fileToUpload = evnt.files[0]
    this.reader.onload = this.handleFileLoad.bind(this);
    this.reader.readAsText(fileToUpload);
    this.fileUpload.clear();
  }

  handleFileLoad(event: any) {
    const fileText = event.target.result;
    try {
      this.toolsService.importData(fileText);
    }
    catch {
      this.messageService.add({ severity: 'error', summary: 'Error reading import file', detail:''});
    }

  }
}
