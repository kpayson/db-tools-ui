import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TableInfo, TableWithColumnsInfo, PerfTestResult, 
  CommandTemplate, CommandTemplateParameter, CommandRunResult } from './models';
import { ExportEntity } from './models/exportEntity';
import { DBConnection } from './models/dbConnection';
import { AuthService } from './services/auth.service';
import { map, mergeMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private authService:AuthService) {}

  private get headers$() {
    return this.authService.getAccessToken().pipe(map(token=>{
      const header = new HttpHeaders().set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token);
      return header;
    }))
  }

  private get<T>(url: string, connectionId?:number) {
    return this.headers$.pipe(mergeMap(headers=>{
      if(connectionId) {url += `?connectionId=${connectionId}`;}
      return this.http.get<T>(`${environment.apiRootUrl}/${url}`, {headers:headers});
    }));

  }

  private post<T>(url: string, body: any, connectionId?:number) {
    return this.headers$.pipe(mergeMap(headers=>{
      if(connectionId) {url += `?connectionId=${connectionId}`;}
      return this.http.post<T>(`${environment.apiRootUrl}/${url}`, body, {headers:headers}); 
    }));
  }

  private put<T>(url: string, body: any, connectionId?:number) {
    return this.headers$.pipe(mergeMap(headers=>{
      if(connectionId) {url += `?connectionId=${connectionId}`;}
      return this.http.put<T>(`${environment.apiRootUrl}/${url}`, body, {headers:headers}); 
    }));
  }

  private delete<T>(url: string, connectionId?:number) {
    return this.headers$.pipe(mergeMap(headers=>{
      if(connectionId) {url += `?connectionId=${connectionId}`;}
      return this.http.delete<T>(`${environment.apiRootUrl}/${url}`, {headers:headers}); 
    }));
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

  public connectionAdd(connection:DBConnection) {
    const res$ = this.post<DBConnection>(`database-connection`,connection);
    return res$;
  }

  public connectionUpdate(connection:DBConnection) {
    const res$ = this.put<DBConnection>(`database-connection/${connection.id}`,connection);
    return res$;
  }

  public connectionDelete(connectionId:number) {
    const res$ = this.delete<DBConnection>(`database-connection/${connectionId}`);
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

  public commandTemplates() {
    const res$ = this.get<CommandTemplate[]>(`command-templates`);
    return res$
  }

  public commandTemplateAdd(commandTemplate:CommandTemplate) {
    const res$ = this.post<CommandTemplate>(`command-templates`,commandTemplate);
    return res$;
  }

  public commandTemplateDelete(commandTemplateId:number) {
    const res$ = this.delete<DBConnection>(`command-templates/${commandTemplateId}`);
    return res$;
  }

  public commandTemplateUpdate(commandTemplate:CommandTemplate) {
    const res$ = this.put<DBConnection>(`command-templates/${commandTemplate.id}`,commandTemplate);
    return res$;
  }

  public commandTemplateWithParameters(templateId:number) {
    const res$ = this.get<CommandTemplate[]>(`command-templates/${templateId}`);
    return res$
  }

  public commandTemplateParameters(templateId:number) {
    const res$ = this.get<CommandTemplateParameter[]>(`command-templates/${templateId}/parameters`);
    return res$
  }

  public commandRunResults() {
    const res$ = this.get<CommandRunResult[]>(`command-run-results`);
    return res$;
  }

  public commandResultReport(commandResultId:number) {
    const res$ = this.get<string>(`command-run-results/${commandResultId}/htmlReport`);
    return res$;
  }


}
