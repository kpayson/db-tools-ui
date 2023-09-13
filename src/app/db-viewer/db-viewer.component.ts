import { Component } from '@angular/core';
import { DbToolsService } from '../db-tools.service';
import { BehaviorSubject, Observable, startWith, combineLatest, map, filter, mergeMap } from 'rxjs';
import {
  FormBuilder,
} from '@angular/forms';

import {TableInfo} from '../models/tablesWithColumns';
import { startsWith } from 'lodash';


@Component({
  selector: 'app-db-viewer',
  templateUrl: './db-viewer.component.html',
  styleUrls: ['./db-viewer.component.scss']
})
export class DbViewerComponent {

  constructor(private toolsService: DbToolsService, private fb: FormBuilder) {
    const showAll$ = this.formGroup.get("showAll")!.valueChanges.pipe(startWith(false));
    const selectedTable$ = this.formGroup.get("selectedTable")!.valueChanges.pipe(filter(Boolean));

    this.tables$ = 
      combineLatest([this.toolsService.allTables, showAll$])
      .pipe(
        map(([tables,showAll])=>{
          const preparedTables = tables.map(t=>({...t,inactive:t.rowCount === 0}))
          const empty = {tableName:'', rowCount:0}
          return showAll ? [empty,...preparedTables] : [empty,...preparedTables.filter(t=>t.rowCount > 0)]
        }));

    this.dataAndColumns$ = selectedTable$.pipe(filter(Boolean),mergeMap(t=>this.toolsService.getTableData(t)));
  }

  formGroup = this.fb.group({
    selectedTable:null as string | null,
    showAll:false
  })

  tables:TableInfo[] = [];

  tables$: Observable<TableInfo[]>

  dataAndColumns$: Observable<{data:any[], cols:string[]}>

  get selectedTableName() {
    return this.formGroup.get("selectedTable")?.value;
  }

  selectedTableOnChange(event:any) {
    console.log(event);
    console.log(this.selectedTableName);
    // this.toolsService.
  }

}
