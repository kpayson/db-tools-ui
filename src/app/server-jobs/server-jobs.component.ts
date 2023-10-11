
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbToolsService } from '../db-tools.service';
import { CommandTemplate } from '../models';
import { CommandTemplateParameter } from '../models/commandTemplateParameter';
import { BehaviorSubject, map } from 'rxjs';
import {keyBy, mapValues} from 'lodash';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JobResultsDialogComponent } from '../job-results-dialog/job-results-dialog.component';


@Component({
  selector: 'app-server-jobs',
  templateUrl: './server-jobs.component.html',
  styleUrls: ['./server-jobs.component.scss'],
  providers: [DialogService]
})
export class ServerJobsComponent implements OnInit {
  @Input() fields: string[]= [];
  form!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(
    private fb: FormBuilder, 
    public toolsService:DbToolsService, 
    public dialogService: DialogService) {}

  // private parseTemplateParameters(template: string): string[] 
  // {
  //   const regex = /{([^}]+)}/g; // Regular expression to match template parameters
  //   const matches = template.match(regex); // Get all matches of template parameters
  
  //   if(! matches) { return []; }

  //   return matches.map(match => match.slice(1, -1)); // Remove the curly braces from each match
  // }

  selectedTemplateParams$ = new BehaviorSubject<CommandTemplateParameter[]>([]);

  commandTemplates$ = this.toolsService.commandTemplates$.pipe(map(templates=>{
    return [{name:''}, ...templates]
  }))

  jobIsRunning = false;

  serverJobsResultColumns = [
    {
      key:"runDate",
      label:"Run Date"
    },
    {
      key:"id",
      label:"Report HTML"
    }
  ];

  get selectedTemplateId() {
    return this.form.get('selectedTemplate')?.value?.id || null
  }

  get selectedTemplateParamValues() {
    const valObj:any = {};
    for(const param of this.selectedTemplateParams$.value) {
      valObj[param.name] = this.form.get(param.name)?.value
    }
    return valObj;
    // const values = this.selectedTemplateParams$.value.map(param=>({
    //   name:param.name,
    //   value: this.form.get(param.name)?.value
    // }));
    // return values;

  }

  private openReportDialog(reportHtml:string) {
    this.ref = this.dialogService.open(JobResultsDialogComponent, { 
      data: reportHtml,
      header: 'Import Results',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }


  ngOnInit() {
    this.form= this.fb.group({
      selectedTemplate:null as CommandTemplate | null,
    });


    this.toolsService.messages$.subscribe(message=>{

      this.jobIsRunning = false;
      this.openReportDialog(message)

    })
  }

  selectedTemplateChange(evnt:{value:any}){
    const currentParamNames= this.selectedTemplateParams$.value.map(param=>param.name);
    for(const name of currentParamNames) {
      this.form.removeControl(name);
    }

    const newParams = evnt.value?.parameters || [];
    for(const param of newParams) {
      //const validator = param.required ? Validators.required : Validators.nullValidator;
      this.form.addControl(param.name, new FormControl(param.defaultValue))
    }

    this.selectedTemplateParams$.next(newParams)
    
  }

  runClick() {
    this.jobIsRunning = true;
    this.toolsService.runServerJob(this.selectedTemplateId, this.selectedTemplateParamValues)
  }

  openReportClick(commandRunId:number){
    this.toolsService.commandResultReport(commandRunId).subscribe(reportHtml=>{
      // console.log(reportHtml);
      this.openReportDialog(reportHtml);
    })
  }

}