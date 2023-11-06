
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbToolsService } from '../db-tools.service';
import { CommandTemplate } from '../models';
import { CommandTemplateParameter } from '../models/commandTemplateParameter';
import { BehaviorSubject, map } from 'rxjs';
import {keyBy, mapValues} from 'lodash';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JobResultsDialogComponent } from '../job-results-dialog/job-results-dialog.component';
import { ServerJobUpsertDialogComponent } from '../server-job-upsert-dialog/server-job-upsert-dialog.component';
import { CommandTemplatesService } from '../command-templates.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-server-jobs',
  templateUrl: './server-jobs.component.html',
  styleUrls: ['./server-jobs.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class ServerJobsComponent implements OnInit {
  @Input() fields: string[]= [];
  form!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(
    private fb: FormBuilder, 
    public toolsService:DbToolsService, 
    public dialogService: DialogService,
    public commandTemplatesService: CommandTemplatesService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
    ) {}

  // private parseTemplateParameters(template: string): string[] 
  // {
  //   const regex = /{([^}]+)}/g; // Regular expression to match template parameters
  //   const matches = template.match(regex); // Get all matches of template parameters
  
  //   if(! matches) { return []; }

  //   return matches.map(match => match.slice(1, -1)); // Remove the curly braces from each match
  // }

  selectedTemplateParams$ = new BehaviorSubject<CommandTemplateParameter[]>([]);

  commandTemplates$ = this.commandTemplatesService.commandTemplates$;
  
  // .pipe(map(templates=>{
  //   return [{name:''}, ...templates]
  // }))

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

  addNewTemplateClick() {
    this.ref = this.dialogService.open(ServerJobUpsertDialogComponent, { 
      data: {mode:'new'},
      header: 'Add New Server Job',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  editSelectedTemplateClick() {
    this.ref = this.dialogService.open(ServerJobUpsertDialogComponent, { 
      data: {mode:'edit', template:this.form.get('selectedTemplate')?.value},
      header: 'Add New Server Job',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  deleteTemplateClick() {
    this.commandTemplatesService.deleteCommandTemplate(this.selectedTemplateId);
  }

  confirmDelete(event: Event) {
    // this.confirmationService.confirm({
    //     target: event.target as EventTarget,
    //     message: 'Are you sure that you want to delete this template?',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.commandTemplatesService.deleteCommandTemplate(this.selectedTemplateId);
    //         this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
    //     },
    //     reject: () => {
    //         this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
    //     }
    // });
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this template?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.commandTemplatesService.deleteCommandTemplate(this.selectedTemplateId),
      reject: () => {}
  });
}

}