import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, ReplaySubject, map, filter } from 'rxjs';
import { TableInfo, TableWithColumnsInfo } from './models/tablesWithColumns';
import { Observable, Subject } from 'rxjs';
import { FileDownloadService } from './file-download.service';
import { groupBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class DbToolsService {

  constructor(
    private dataService: DataService,
    private fileDownloadService: FileDownloadService) {

    this._tablesAndColumnsTree$ = new BehaviorSubject<TreeNode[]>([]);
    this.dataService.tablesWithColumns().pipe(map((tArray: TableWithColumnsInfo[]) => {
      return tArray.map(t => {
        return {
          key: t.tableName,
          label: t.tableName,
          icon: 'pi pi-table',
          children: t.columns.map(c => {
            return {
              key: c.columnName,
              label: c.columnName,
              data: {
                tableName: t.tableName,
                dataType: c.dataType,
                columnType: c.columnType,
                isNullable: c.isNullable,
                extra: c.extra
              }
            }
          })
        } as TreeNode
      });
    })).subscribe(trees => {
      this._tablesAndColumnsTree$.next(trees);
    });

    this._tableList$ = new BehaviorSubject<TableInfo[]>([]);
    this.dataService.tables().subscribe(tables => {
      this._tableList$.next(tables)
    })

    this._exportResults = new ReplaySubject<any>();
    this._importResults = new ReplaySubject<any>();
  }

  private _tableList$: Subject<TableInfo[]>;
  public get allTables() {
    return this._tableList$.pipe(
      map(
        tables => {
          tables.sort((a, b) => a.tableName < b.tableName ? -1 : 1);
          return tables;
        }));
  }
  public get nonEmptyTables() {
    return this._tableList$.pipe(map(tList => tList.filter(t => t.rowCount > 0)));
  }

  private _tablesAndColumnsTree$: Subject<TreeNode[]>;
  get tablesAndColumnsTree$() {
    return this._tablesAndColumnsTree$.asObservable();
  }

  private _exportResults: Subject<any>;
  get exportResults() {
    return this._exportResults.asObservable();
  }

  private _importResults: Subject<any>;
  get importResults() {
    return this._importResults.asObservable();
  }

  exportData(treeSelection: TreeNode[], filterText: string) {
    const rows = filterText.split('\n');
    const tableFilters = rows.filter(r => Boolean(r.trim())).map(r => {
      const indexOfFirstSpace = r.search(/\s/);
      const tableName = r.substring(0, indexOfFirstSpace);
      const filter = r.substring(indexOfFirstSpace + 1);
      return { tableName, filter };
    });

    const filtersDict =
      tableFilters.reduce((dictionary: { [tableName: string]: string[] }, { tableName, filter }) => {
        if (dictionary[tableName]) {
          dictionary[tableName].push(filter);
        } else {
          dictionary[tableName] = [filter];
        }
        return dictionary;
      }, {});

    // tree selection wont have table node if all columns aren't selected so just group the children (columns) by the table
    const childNodes = treeSelection.filter(t => !t.children);
    const childNodesByTable = groupBy(childNodes, ((n: any) => n.data.tableName));
    const exportEntities = Object.keys(childNodesByTable).map(k => {
      return {
        name: k,
        filters: filtersDict[k],
        exportFields: childNodesByTable[k].map((n: any) => n.label)
      }
    })

    this.dataService.exportData(exportEntities).subscribe((res: any) => {
      const json = JSON.stringify(res, null, 4);
      this.fileDownloadService.jsonFileDownload(json, 'export_download.json')
      console.log(res);
      this._exportResults.next(res);
    }, (err) => {
      console.log(err);
    });
  }

  importData(jsonData: string) {
    const obj = JSON.parse(jsonData);
    this.dataService.importData(obj).subscribe((res: any) => {
      console.log(res);
      this._importResults.next(res);
    }, (err) => {
      console.log(err);
    });
  }

  getTableData(tableName:string) {
    return this.dataService.tableData(tableName).pipe(map(tableData=>{
      const cols = tableData.some(Boolean) ? Object.keys(tableData[0]) : [];
      for(const row of tableData) {
        for(const field in row) {
          if(typeof row[field] === "object") {
            row[field] = JSON.stringify(row[field]);
          }
        }
      }
      return {
        data:tableData,
        cols
      };
    }));
  }

  seedDB(counts:{[tableName:string]:number}) {
    return this.dataService.seedDB(counts);
  }


}

