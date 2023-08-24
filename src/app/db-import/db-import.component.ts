import { Component } from '@angular/core';
import { DbToolsService } from '../db-tools.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImportResultsDialogComponent } from '../import-results-dialog/import-results-dialog.component';


@Component({
  selector: 'app-db-import',
  templateUrl: './db-import.component.html',
  styleUrls: ['./db-import.component.scss'],
  providers: [DialogService],
})
export class DbImportComponent {

  ref: DynamicDialogRef | undefined;

  constructor(
    private reader: FileReader, 
    private toolsService: DbToolsService,
    public dialogService: DialogService) { 

      toolsService.importErrors$.subscribe(errors=>{
        this.ref = this.dialogService.open(ImportResultsDialogComponent, { 
          data: errors,
          header: 'Import Results',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });
      })
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
  }

  handleFileLoad(event: any) {
    const fileText = event.target.result;
    this.toolsService.importData(fileText);
  }
}
