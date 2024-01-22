import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DataReportsUpsertDialogComponent } from '../data-reports-upsert-dialog/data-reports-upsert-dialog.component';
import { DataReportResultDialogComponent } from '../data-report-result-dialog/data-report-result-dialog.component';
import { DataReportsStateService } from '../data-reports-state.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DataReport, DataReportParameter, CustomView, CustomViewParameter } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DbToolsService } from '../db-tools.service';
import { CustomViewsStateService } from '../custom-views-state.service';


@Component({
  selector: 'app-data-reports',
  templateUrl: './data-reports.component.html',
  styleUrls: ['./data-reports.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class DataReportsComponent implements OnInit, OnDestroy {

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

  lastAddedEntitySubscription: Subscription | undefined;

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedReport: null as DataReport | null,
    });
  }

  ngOnDestroy(): void {
    this.lastAddedEntitySubscription?.unsubscribe();
  }

  get selectedReportId() {
    return this.form.get('selectedReport')?.value?.id || null
  }

  get selectedReportName() {
    return this.form.get('selectedReport')?.value?.name || null
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

  private resetForm(dataReport: DataReport){
    
    this.reportRan = false;
    this.form.patchValue({selectedReport: dataReport});

    const currentReportParamNames = this.selectedReportParams$.value.map(param => param.name);
    for (const name of currentReportParamNames) {
      this.form.removeControl(name);
    }

    const currentViewParamNames = this.customViewParams$.value.map(param => param.name);
    for (const name of currentViewParamNames) {
      this.form.removeControl(name);
    }

    const newReportParams = dataReport?.parameters || [];
    for (const param of newReportParams) {
      this.form.addControl(param.name, new FormControl(param.defaultValue))
    }
    this.selectedReportParams$.next(newReportParams)

    const customViewId = dataReport.customViewId;
    const customView = this.customViewsStateService.findById(customViewId);
    this.customViewParams$.next(customView?.parameters || []);

    const newViewParams = customView?.parameters || [];
    for (const param of newViewParams) {
      this.form.addControl(param.name, new FormControl(param.defaultValue, Validators.required))
    }
  }

  private clearForm() {
    this.reportRan = false;
    this.form.patchValue({selectedReport: null});

    const currentReportParamNames = this.selectedReportParams$.value.map(param => param.name);
    for (const name of currentReportParamNames) {
      this.form.removeControl(name);
    }
    this.selectedReportParams$.next([]);

    const currentViewParamNames = this.customViewParams$.value.map(param => param.name);
    for (const name of currentViewParamNames) {
      this.form.removeControl(name);
    }
    this.customViewParams$.next([]);
  }

  selectedReportChange(evnt: { value: any }) {
    this.resetForm(evnt.value);
  }

  editSelectedClick() {
    this.ref = this.dialogService.open(DataReportsUpsertDialogComponent, {
      data: { mode: 'edit', dataReport: this.form.get('selectedReport')?.value },
      header: 'Edit Data Report',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((dataReport: DataReport) => {
      if (dataReport) {
        this.resetForm(dataReport);
      }
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

    this.ref.onClose.subscribe((dataReport: DataReport) => {
      this.lastAddedEntitySubscription = this.state.lastAddedEntity$.subscribe((dataReport) => {
        if (dataReport) {
          this.resetForm(dataReport);
        }
      });
    });
  }

  confirmDelete($event: any) {
    if (this.selectedReportId) {
      this.state.delete(this.selectedReportId);
      this.clearForm();
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
        const dialogData = {
          name: this.selectedReportName,
          key: data.key,
          html: data.report
        }
        //this.reportHtml = data;
        this.reportRan = true;
        this.ref = this.dialogService.open(DataReportResultDialogComponent, {
            data: dialogData,
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
