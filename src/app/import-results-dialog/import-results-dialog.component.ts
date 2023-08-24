import { Component, OnInit } from '@angular/core';

import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-import-results-dialog',
  templateUrl: './import-results-dialog.component.html',
  styleUrls: ['./import-results-dialog.component.scss']
})
export class ImportResultsDialogComponent implements OnInit{

  importErrors: {tableName:string, importData:string, errorMessage:string}[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit() {
    if(this.config.data) {
      this.importErrors = this.config.data || [];
    }
    
  }
}
