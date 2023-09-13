import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TableInfo, TableWithColumnsInfo, ColumnInfo, PerfTestResult } from './models';
import { ExportEntity } from './models/exportEntity';
import { catchError, of } from 'rxjs';
import { DBConnection } from './models/dbConnection';
import { DbConnectionsService } from './db-connections.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  private get<T>(url: string, connectionId?:number) {
    if(connectionId) {url += `?connectionId=${connectionId}`;}
    return this.http.get<T>(`${environment.apiRootUrl}/${url}`); //.pipe(catchError((err:any)=>of(err)));
  }

  private post<T>(url: string, body: any, connectionId:number) {
    if(connectionId) {url += `?connectionId=${connectionId}`;}
    return this.http.post<T>(`${environment.apiRootUrl}/${url}`, body);
  }

  public tables(connectionId:number) {
    const res$ = this.get<TableInfo[]>("dbTools/Tables", connectionId);
    return res$;
  }

  public tablesWithColumns(connectionId:number) {
    const res$ = this.get<TableWithColumnsInfo[]>("dbTools/TablesWithColumns", connectionId);
    return res$;
  }

  public exportData(exportEntities: ExportEntity[],connectionId:number) {
    const res$ = this.post<any>("dbTools/ExportData", exportEntities, connectionId);
    return res$;
  }

  public importData(dataObj: any,connectionId:number) {
    const res$ = this.post<any>("dbTools/importData", dataObj, connectionId);
    return res$;
  }

  public tableData(tableName:string,connectionId:number) {
    const res$ = this.get<any[]>(`dbTools/TableData/${tableName}`, connectionId);
    return res$;
  }

  public seedDB(counts:{[tableName:string]:number},connectionId:number) {
    const res$ = this.post<any>(`dbTools/SeedDatabase`,counts, connectionId);
    return res$;
  }

  public connections() {
    const res$ = this.get<DBConnection[]>(`database-connection`);
    return res$;
  }

  public perfTestResults(connectionId:number) {
    const res$ = this.get<PerfTestResult[]>(`perf-test-results`, connectionId);
    return res$;
  }

  public perfTestReport(reportId:number) {
    const res$ = this.get<string>(`perf-test-results/htmlReport/${reportId}`);
    return res$;
  }

}
