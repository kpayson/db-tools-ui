import { Component } from '@angular/core';
import { DbConnectionsService } from '../db-connections.service';
import {
  FormBuilder, FormGroup,
} from '@angular/forms';
import { DBConnection } from '../models/dbConnection';
import { filter, first } from 'rxjs';
import { DbToolsService } from '../db-tools.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DbConnectionUpsertDialogComponent } from '../db-connection-upsert-dialog/db-connection-upsert-dialog.component'; 


@Component({
  selector: 'app-db-connections',
  templateUrl: './db-connections.component.html',
  styleUrls: ['./db-connections.component.scss'],
  providers: [DialogService]
})
export class DbConnectionsComponent {
  constructor(
    public connectionsService:DbConnectionsService,
    private fb: FormBuilder,
    public dialogService: DialogService
  ){
    this.connectionsService.databaseConnections.subscribe(conns=>{
      console.log(conns);
    })

    this.formGroup = this.fb.group({
      selectedConnection:null as DBConnection | null,
    });

    this.connectionsService.activeConnection.pipe(filter(Boolean),first()).subscribe(conn=>{
      this.formGroup.patchValue({selectedConnection:conn})
    });


  }

  formGroup: FormGroup
  ref: DynamicDialogRef | undefined;

  connectionChange(evnt:{value:any}){
    console.log(evnt);
    this.connectionsService.setActiveConnection(evnt.value)
  }
  addConnection(){

    this.ref = this.dialogService.open(DbConnectionUpsertDialogComponent, {  
      header: 'Add Connection',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      data: {mode:'new'}
    });
    this.ref.onClose.subscribe((conn:DBConnection) => {

    }
    )
  }

  editConnection(){
    this.dialogService.open(DbConnectionUpsertDialogComponent, {  
      header: 'Add Connection',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      data: {mode:'edit', connection:this.formGroup.get('selectedConnection')?.value}
    });
  }

  deleteConnection() {
    if(!this.formGroup.get('selectedConnection')?.value) { return; }
    this.connectionsService.deleteConnection(this.formGroup.get('selectedConnection')?.value.id); 
  }



}
