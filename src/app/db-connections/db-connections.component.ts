import { Component } from '@angular/core';
import { DbConnectionsService } from '../db-connections.service';
import {
  FormBuilder, FormGroup,
} from '@angular/forms';
import { DBConnection } from '../models/dbConnection';
import { filter, first } from 'rxjs';


@Component({
  selector: 'app-db-connections',
  templateUrl: './db-connections.component.html',
  styleUrls: ['./db-connections.component.scss']
})
export class DbConnectionsComponent {
  constructor(
    public connectionsService:DbConnectionsService,
    private fb: FormBuilder
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

  connectionChange(evnt:{value:any}){
    console.log(evnt);
    this.connectionsService.setActiveConnection(evnt.value)
  }



}
