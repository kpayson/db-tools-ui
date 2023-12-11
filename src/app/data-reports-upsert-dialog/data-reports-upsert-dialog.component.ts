import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataReport, CustomView } from '../models';
import { CustomViewsStateService } from '../custom-views-state.service';
import { DataReportsStateService } from '../data-reports-state.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-data-reports-upsert-dialog',
  templateUrl: './data-reports-upsert-dialog.component.html',
  styleUrls: ['../../form-styles.scss']
})
export class DataReportsUpsertDialogComponent {
  formGroup: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    // customView: FormControl<CustomView | null>;
    customViewId: FormControl<number | null>;
    reportTemplate: FormControl<string | null>;
    parameters: any;
  }>;

  constructor(
    private fb: FormBuilder, 
    public customViewsService:CustomViewsStateService,
    public state:DataReportsStateService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { 

    const cv = {
      id:0, name:'',description:'',viewSql:'',parameters:[] as any[]
    }


    this.formGroup = fb.group({
      name: ['', Validators.required],
      description: [''],
      //customView: [cv, Validators.required],
      customViewId: [null as number | null, Validators.required],
      reportTemplate: ['', Validators.required],

      parameters: this.fb.array([])
    });

    if(this.config.data.mode === 'edit'){
      this.formGroup.patchValue(this.config.data.dataReport);
      const formArray = this.formGroup.controls['parameters'] as FormArray;
      for(const parameter of this.config.data.dataReport.parameters || []){
        formArray.push(this.fb.group({
          name: [parameter.name, Validators.required],
          //dataType: [parameter.dataType, Validators.required],
          defaultValue: [parameter.defaultValue],
          id: [parameter.id],
          dataReportId: [parameter.dataReportId]
        }));
      }

    }
  }


  get parameters() {
    return this.formGroup.get('parameters') as FormArray;
  }

  get customViewId() {
    return this.formGroup.get('customViewId')?.value || null
  }

  addParameter() {
    const parameter = this.fb.group({
      name: ['', Validators.required],
      // dataType: ['string', Validators.required],
      defaultValue: ['']
    });
    this.parameters.push(parameter);
  }

  removeParameter(index: number) {
    this.parameters.removeAt(index);
  }

  save() {
    if(this.formGroup.invalid){
      return;
    }

    const dataReport:DataReport = {
      id: this.config.data.dataReport?.id,
      name: this.formGroup.get('name')?.value || '',
      description: this.formGroup.get('description')?.value || '',
      reportTemplate: this.formGroup.get('reportTemplate')?.value || '',
      customViewId: this.customViewId!,

      parameters: this.parameters.value || [] 
    }

    if(this.config.data.mode === 'edit'){
      this.state.update(dataReport);
    } else {
      this.state.add(dataReport);
    }

    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }
}
