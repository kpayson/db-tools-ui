import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DataReportsUpsertDialogComponent } from '../data-reports-upsert-dialog/data-reports-upsert-dialog.component';
import { DataReportResultDialogComponent } from '../data-report-result-dialog/data-report-result-dialog.component';
import { DataReportsStateService } from '../data-reports-state.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataReport, DataReportParameter, CustomView, CustomViewParameter } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { DbToolsService } from '../db-tools.service';
import { CustomViewsStateService } from '../custom-views-state.service';


@Component({
  selector: 'app-data-reports',
  templateUrl: './data-reports.component.html',
  styleUrls: ['./data-reports.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class DataReportsComponent {

  form!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(
    public state: DataReportsStateService,
    public customViewsStateService: CustomViewsStateService,
    public toolsService: DbToolsService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {

  }

  selectedReportParams$ = new BehaviorSubject<DataReportParameter[]>([]);
  customViewParams$ = new BehaviorSubject<CustomViewParameter[]>([]);

  reportRan = false;
  reportHtml = "";

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedReport: null as DataReport | null,
    });
  }

  get selectedReportId() {
    return this.form.get('selectedReport')?.value?.id || null
  }

  get hasSelectedReport() {
    return this.form.get('selectedReport')?.value ? true : false;
  }

  get selectedReportParamValues() {
    const valObj: any = {};
    for (const param of this.selectedReportParams$.value) {
      valObj[param.name] = this.form.get(param.name)?.value
    }
    return valObj;
  }

  get viewParamValues() {
    const valObj: any = {};
    for (const param of this.customViewParams$.value) {
      valObj[param.name] = this.form.get(param.name)?.value
    }
    return valObj;
  }

  selectedReportChange(evnt: { value: any }) {
    this.state.setSelected(evnt.value);
    this.reportRan = false;

    const currentReportParamNames = this.selectedReportParams$.value.map(param => param.name);
    for (const name of currentReportParamNames) {
      this.form.removeControl(name);
    }

    const currentViewParamNames = this.customViewParams$.value.map(param => param.name);
    for (const name of currentViewParamNames) {
      this.form.removeControl(name);
    }

    const newReportParams = evnt.value?.parameters || [];
    for (const param of newReportParams) {
      //const validator = param.required ? Validators.required : Validators.nullValidator;
      this.form.addControl(param.name, new FormControl(param.defaultValue))
    }
    this.selectedReportParams$.next(newReportParams)

    const customViewId = evnt.value?.customViewId || null;
    const customView = this.customViewsStateService.findById(customViewId);
    this.customViewParams$.next(customView?.parameters || []);

    const newViewParams = customView?.parameters || [];
    for (const param of newViewParams) {
      //const validator = param.required ? Validators.required : Validators.nullValidator;
      this.form.addControl(param.name, new FormControl(param.defaultValue))
    }
  }

  editSelectedClick() {
    this.ref = this.dialogService.open(DataReportsUpsertDialogComponent, {
      data: { mode: 'edit', dataReport: this.state.selectedEntity },
      header: 'Edit Data Report',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  addNewClick() {
    this.ref = this.dialogService.open(DataReportsUpsertDialogComponent, {
      data: { mode: 'new' },
      header: 'Add New Data Report',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  confirmDelete($event: any) {
    if (this.selectedReportId) {
      this.state.delete(this.selectedReportId);
    }
  }

  runClick() {
    this.reportRan = false;
    const paramValues = {
      reportParams: this.selectedReportParamValues,
      viewParams: this.viewParamValues
    }

    this.toolsService.runDataReport(this.selectedReportId, paramValues).subscribe({
      next: (data) => {
        this.reportHtml = data;
        this.reportRan = true;
        this.ref = this.dialogService.open(DataReportResultDialogComponent, {
            data,
            header: 'Data Report',
            width: '95%',
            height: '95%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true
        })
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }


}

// this.ref = this.dialogService.open(JobResultsDialogComponent, { 
//   data: reportHtml,
//   header: 'Import Results',
//   width: '95%',
//   height: '95%',
//   contentStyle: { overflow: 'auto' },
//   baseZIndex: 10000,
//   maximizable: true
// });


