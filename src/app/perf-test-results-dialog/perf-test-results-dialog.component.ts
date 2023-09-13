import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-perf-test-results-dialog',
  templateUrl: './perf-test-results-dialog.component.html',
  styleUrls: ['./perf-test-results-dialog.component.scss']
})
export class PerfTestResultsDialogComponent implements OnInit {

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
