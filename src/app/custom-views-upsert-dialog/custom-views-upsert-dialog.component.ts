import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CustomView } from '../models';
import { CustomViewsStateService } from '../custom-views-state.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
//import { Parser } from 'node-sql-parser';

//const { Parser } = require('node-sql-parser');
@Component({
  selector: 'app-custom-views-upsert-dialog',
  templateUrl: './custom-views-upsert-dialog.component.html',
  styleUrls: ['../../form-styles.scss']

})
export class CustomViewsUpsertDialogComponent {

  formGroup: FormGroup<{
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    viewSql: FormControl<string | null>;
    parameters: any;
  }>;

  constructor(
    private fb: FormBuilder, 
    public state:CustomViewsStateService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { 
    this.formGroup = fb.group({
      name: ['', Validators.required],
      description: [''],
      viewSql: ['', Validators.required],
      parameters: this.fb.array([])
    });

    if(this.config.data.mode === 'edit'){
      this.formGroup.patchValue(this.config.data.customView);
      const formArray = this.formGroup.controls['parameters'] as FormArray;
      for(const parameter of this.config.data.customView.parameters || []){
        formArray.push(this.fb.group({
          name: [parameter.name, Validators.required],
          dataType: [parameter.dataType, Validators.required],
          defaultValue: [parameter.defaultValue],
          id: [parameter.id],
          customViewId: [parameter.customViewId]
        }));
      }

    }
  }


  get parameters() {
    return this.formGroup.get('parameters') as FormArray;
  }

  addParameter() {
    const parameter = this.fb.group({
      name: ['', Validators.required],
      dataType: ['string', Validators.required],
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
    // const viewSql = this.formGroup.get('viewSql')?.value || '';
     //const parser = new Parser();
    // const ast = parser.astify(viewSql) as any;

    // if(ast.type !== 'select'){
    //   alert('Only SELECT statements are supported');
    //   return;
    // }

    const customView:CustomView = {
      id: this.config.data.customView?.id,
      name: this.formGroup.get('name')?.value || '',
      description: this.formGroup.get('description')?.value || '',
      viewSql: this.formGroup.get('viewSql')?.value || '',

      parameters: this.parameters.value || [] 
    }

    if(this.config.data.mode === 'edit'){
      this.state.update(customView);
    } else {
      this.state.add(customView);
    }

    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }

}
