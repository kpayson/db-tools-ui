import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TableInfo, TableWithColumnsInfo, ColumnInfo } from './models/tablesWithColumns';
import { ExportEntity } from './models/exportEntity';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  private get<T>(url: string) {
    return this.http.get<T>(`${environment.apiRootUrl}/${url}`); //.pipe(catchError((err:any)=>of(err)));
  }

  private post<T>(url: string, body: any) {
    return this.http.post<T>(`${environment.apiRootUrl}/${url}`, body);
  }

  public tables() {
    const res$ = this.get<TableInfo[]>("Tables");
    return res$;
  }

  public tablesWithColumns() {
    const res$ = this.get<TableWithColumnsInfo[]>("TablesWithColumns");
    return res$;
  }

  public exportData(exportEntities: ExportEntity[]) {
    const res$ = this.post("ExportData", exportEntities);
    return res$;
  }

  public importData(dataObj: any) {
    const res$ = this.post("importData", dataObj);
    return res$;
  }

  public tableData(tableName:string) {
    const res$ = this.get<any[]>(`TableData/${tableName}`);
    return res$;
  }

  public seedDB(counts:{[tableName:string]:number}) {
    const res$ = this.post(`SeedDatabase`,counts);
    return res$;
  }

}
