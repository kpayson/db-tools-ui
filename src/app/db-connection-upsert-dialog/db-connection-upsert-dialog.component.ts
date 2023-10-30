import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {DbConnectionsService} from '../db-connections.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-db-connection-upsert-dialog',
  templateUrl: './db-connection-upsert-dialog.component.html',
  styleUrls: ['./db-connection-upsert-dialog.component.scss']
})
export class DbConnectionUpsertDialogComponent {
  
  formGroup: FormGroup<{ 
    name: FormControl<string | null>; 
    dialect: FormControl<string | null>; 
    host: FormControl<string | null>; 
    port: FormControl<string | null>; 
    database: FormControl<string | null>; 
    username: FormControl<string | null>; 
    password: FormControl<string | null>; 
    authServer: FormControl<string | null>; }>;

    dialects = [{name:'MariaDB', value:'mariadb'}, {name:'MySQL', value:'mysql'}]

  constructor(
    private connectionsService: DbConnectionsService, 
    fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
    ) {
    this.formGroup = fb.group({
      name:['', Validators.required],
      dialect:['mysql', Validators.required],
      host:['', Validators.required],
      port:['', Validators.required],
      database:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      authServer:['', Validators.required],
    });

    if(this.config.data.mode === 'edit'){
      this.formGroup.patchValue(this.config.data.connection);
    }
    
  }

  save(){
    if(this.formGroup.invalid){
      return;
    }
    const connection = {
      id: this.config.data.connection?.id,
      name: this.formGroup.get('name')?.value || '',
      dialect: this.formGroup.get('dialect')?.value || '',
      host: this.formGroup.get('host')?.value || '',
      port: Number(this.formGroup.get('port')?.value || 3036),
      database: this.formGroup.get('database')?.value || '',
      username: this.formGroup.get('username')?.value || '',
      password: this.formGroup.get('password')?.value || '',
      authServer: this.formGroup.get('authServer')?.value || '',
    }

    if(this.config.data.mode === 'edit'){
      this.connectionsService.updateConnection(connection);
      this.ref.close();
    } 
    else { // add new
      this.connectionsService.addConnection(connection);
      this.ref.close();
  }
}

  cancel(){
    this.ref.close();
  }


}




// import { FormControl, FormGroup, Validators } from '@angular/forms';

// export class DatabaseConnection {
//   name: string;
//   dialect: string;
//   host: string;
//   port: number;
//   database: string;
//   username: string;
//   password: string;
//   authServer: string;

//   static fromForm(form: FormGroup): DatabaseConnection {
//     const connection = new DatabaseConnection();
//     connection.name = form.get('name').value;
//     connection.dialect = form.get('dialect').value;
//     connection.host = form.get('host').value;
//     connection.port = form.get('port').value;
//     connection.database = form.get('database').value;
//     connection.username = form.get('username').value;
//     connection.password = form.get('password').value;
//     connection.authServer = form.get('authServer').value;
//     return connection;
//   }

//   static toForm(connection: DatabaseConnection): FormGroup {
//     return new FormGroup({
//       name: new FormControl(connection.name, Validators.required),
//       dialect: new FormControl(connection.dialect, Validators.required),
//       host: new FormControl(connection.host, Validators.required),
//       port: new FormControl(connection.port, Validators.required),
//       database: new FormControl(connection.database, Validators.required),
//       username: new FormControl(connection.username, Validators.required),
//       password: new FormControl(connection.password),
//       authServer: new FormControl(connection.authServer),
//     });
//   }
// }