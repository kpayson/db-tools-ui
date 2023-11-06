import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CommandTemplate, CommandTemplateParameter } from '../models';

import { CommandTemplatesService } from '../command-templates.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { PrimeIcons, MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-server-job-upsert-component',
  templateUrl: './server-job-upsert-dialog.component.html',
  styleUrls: ['./server-job-upsert-dialog.component.scss']
})
export class ServerJobUpsertDialogComponent {
  formGroup: FormGroup<{
    name: FormControl<string | null>;
    template: FormControl<string | null>;
    resultLocationType: FormControl<string | null>; //'terminal' | 'file';
    resultFilePath: FormControl<string | null>;
    parameters: any;
  }>;
  
  constructor(
    private fb: FormBuilder, 
    public commandTemplatesService:CommandTemplatesService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    
    
    ) { 
    this.formGroup = fb.group({
      name: ['', Validators.required],
      template: ['', Validators.required],
      resultLocationType: ['terminal', Validators.required],
      resultFilePath: [''],
      parameters: this.fb.array([])
    });

    if(this.config.data.mode === 'edit'){
      this.formGroup.patchValue(this.config.data.template);
      const formArray = this.formGroup.controls['parameters'] as FormArray;
      for(const parameter of this.config.data.template.parameters){
        formArray.push(this.fb.group({
          name: [parameter.name, Validators.required],
          dataType: [parameter.dataType, Validators.required],
          defaultValue: [parameter.defaultValue],
          id: [parameter.id],
          commandTemplateId: [parameter.commandTemplateId]
        }));
      }
      console.log(this.formGroup.value);
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
    const template:CommandTemplate = {
      id: this.config.data.template?.id,
      name: this.formGroup.get('name')?.value || '',
      template: this.formGroup.get('template')?.value || '',
      resultLocationType: 'terminal',  // TODO
      resultFilePath: '', // TODO
      parameters: this.parameters.value || [] //
    }

    if(this.config.data.mode === 'edit'){
      this.commandTemplatesService.updateCommandTemplate(template);
    } else {
      this.commandTemplatesService.addCommandTemplate(template);
    }

    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }



}
