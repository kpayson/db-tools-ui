import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CustomViewsUpsertDialogComponent } from '../custom-views-upsert-dialog/custom-views-upsert-dialog.component';
import { CustomViewsStateService } from '../custom-views-state.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomView } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { DbToolsService } from '../db-tools.service';

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
    private fb: FormBuilder,
  ) {
  }

  selectedViewParams$ = new BehaviorSubject<CustomView[]>([]);

  viewData: any[] = []; 
  viewDataCols: any[] = [];

  get selectedViewParamValues() {
    const valObj:any = {};
    for(const param of this.selectedViewParams$.value) {
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

  selectedViewChange(evnt:{value:any}) {
    this.state.setSelected(evnt.value);

    const currentParamNames= this.selectedViewParams$.value.map(param=>param.name);
    for(const name of currentParamNames) {
      this.form.removeControl(name);
    }

    const newParams = evnt.value?.parameters || [];
    for(const param of newParams) {
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
    this.toolsService.runCustomView(this.selectedViewId, this.selectedViewParamValues).subscribe((data)=>{
      this.viewData = data;
      this.viewDataCols = Object.keys(data[0]);
    });
  }

}
