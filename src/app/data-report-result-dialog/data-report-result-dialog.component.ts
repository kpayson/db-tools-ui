import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-data-report-result-dialog',
  templateUrl: './data-report-result-dialog.component.html',
  styleUrls: ['./data-report-result-dialog.component.scss']
})
export class DataReportResultDialogComponent implements OnInit {
  safeHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {

  }
  ngOnInit(): void {
    if(this.config.data) {
      this.safeHtml = this.config.data;
      
    }
  }

}
