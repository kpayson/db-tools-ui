import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-report-email-dialog',
  templateUrl: './data-report-email-dialog.component.html',
  styleUrls: ['./data-report-email-dialog.component.scss']
})
export class DataReportEmailDialogComponent implements OnDestroy {

  emailForm: FormGroup<{
    toAddress: FormControl<string | null>;
    subjectLine: FormControl<string | null>;
    messageBody: FormControl<string | null>;
  }>;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    let subjectLine = '';
    if (config.data.subjectLine) {
      subjectLine = config.data.subjectLine;
    } else if (config.data.reportName) {
      subjectLine = `${config.data.reportName} Results`;
    } else {
      subjectLine = 'Data Report Results';
    }

    const messageBody = 
      `Please see attached data report.\n\n` +

      `Report Name: ${config.data.reportName}\n\n` +

      `Run Date: ${config.data.runDate.toLocaleString()}`;

    this.emailForm = new FormGroup({
      toAddress: new FormControl('', [Validators.required, Validators.email]),
      subjectLine: new FormControl(subjectLine, [Validators.required]),
      messageBody: new FormControl(messageBody, [Validators.required])
    });

  }

  attachmentFileName = this.config.data?.attachmentFileName || '';

  get toAddress() {
    return this.emailForm.get('toAddress');
  }

  get subjectLine() {
    return this.emailForm.get('subjectLine');
  }

  get messageBody() {
    return this.emailForm.get('messageBody');
  }

  downloadReport() { }

  sendEmail() {
    if (this.emailForm.valid) {
      this.ref.close(this.emailForm.value);
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
