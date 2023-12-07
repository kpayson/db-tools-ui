import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomViewsUpsertDialogComponent } from '../custom-views-upsert-dialog/custom-views-upsert-dialog.component';
import { CustomViewsStateService } from '../custom-views-state.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomView } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { DbToolsService } from '../db-tools.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-custom-views',
  templateUrl: './custom-views.component.html',
  styleUrls: ['./custom-views.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class CustomViewsComponent implements OnInit {

  form!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(
    public state: CustomViewsStateService,
    public toolsService: DbToolsService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) {
  }

  selectedViewParams$ = new BehaviorSubject<CustomView[]>([]);

  viewRan = false;
  viewData: any[] = [];
  viewDataCols: any[] = [];
  selectedRows: any[] = [];

  get selectedViewParamValues() {
    const valObj: any = {};
    for (const param of this.selectedViewParams$.value) {
      valObj[param.name] = this.form.get(param.name)?.value
    }
    return valObj;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedView: null as CustomView | null,
    });
  }

  get selectedViewId() {
    return this.form.get('selectedView')?.value?.id || null
  }

  get hasSelectedView() {
    return this.form.get('selectedView')?.value ? true : false;
  }

  selectedViewChange(evnt: { value: any }) {
    this.state.setSelected(evnt.value);
    this.viewRan = false;

    const currentParamNames = this.selectedViewParams$.value.map(param => param.name);
    for (const name of currentParamNames) {
      this.form.removeControl(name);
    }

    const newParams = evnt.value?.parameters || [];
    for (const param of newParams) {
      //const validator = param.required ? Validators.required : Validators.nullValidator;
      this.form.addControl(param.name, new FormControl(param.defaultValue))
    }

    this.selectedViewParams$.next(newParams)

  }

  editSelectedClick() {
    this.ref = this.dialogService.open(CustomViewsUpsertDialogComponent, {
      data: { mode: 'edit', customView: this.state.selectedEntity },
      header: 'Edit Custom View',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  addNewClick() {
    this.ref = this.dialogService.open(CustomViewsUpsertDialogComponent, {
      data: { mode: 'new' },
      header: 'Add New Custom View',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  confirmDelete($event: any) {
    if (this.selectedViewId) {
      this.state.delete(this.selectedViewId);
    }
  }

  runClick() {
    this.viewRan = false;
    this.viewData = [];

    this.toolsService.runCustomView(this.selectedViewId, this.selectedViewParamValues).subscribe((data) => {
      this.viewData = data;
      this.viewDataCols = data.some(Boolean) ? Object.keys(data[0]) : [];
      this.viewRan = true;
    },(err)=>{  
      this.messageService.add({severity:'error', summary: 'Error', detail: err.error.message});
    });
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.viewData);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array"
      });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    //import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    //});
  }

}
