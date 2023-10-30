import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-job-results-dialog',
  templateUrl: './job-results-dialog.component.html',
  styleUrls: ['./job-results-dialog.component.scss']
})
export class JobResultsDialogComponent {
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
