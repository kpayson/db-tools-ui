import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TreeNode } from 'primeng/api';
import { first, Subject, BehaviorSubject, ReplaySubject, map, filter, mergeMap, combineLatest } from 'rxjs';
import { TableInfo, TableWithColumnsInfo, PerfTestResult, CommandTemplate, CommandTemplateParameter, CommandRunResult } from './models';
import { FileDownloadService } from './file-download.service';
import { groupBy } from 'lodash';
import { DbConnectionsService } from './db-connections.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DbToolsService {

  private get activeConnId$() {
    return this.dbConnectionsService.activeConnection.pipe(filter(Boolean),map(conn=>conn.id));
  }

  private socket!: WebSocket;
  private _webSocketMessages$ = new Subject<string>();
  get messages$(){
    return this._webSocketMessages$.asObservable();
  }  

  private wsConnect() {
    this.socket = new WebSocket(environment.webSocketEndpoint); // 'ws://localhost:3000/websocket'

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      this._webSocketMessages$.next(event.data);

      this.activeConnId$
      .pipe(first(), mergeMap((connId)=>this.dataService.perfTestResults(connId!)))
      .subscribe(results=>this._perfTestResults$.next(results))

      this.dataService.commandRunResults().pipe(first()).subscribe(results=>this._commandRunResults$.next(results));

      console.log('WebSocket message received:', event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  constructor(
    private dataService: DataService,
    private fileDownloadService: FileDownloadService,
    private dbConnectionsService: DbConnectionsService
  ) {

    this._tablesAndColumnsTree$ = new BehaviorSubject<TreeNode[]>([]);
    this._tableList$ = new BehaviorSubject<TableInfo[]>([]);
    this._dataChangeNotice$ = new BehaviorSubject<string>('');
    this._perfTestResults$ = new BehaviorSubject<PerfTestResult[]>([]);
    this._commandRunResults$ = new BehaviorSubject<CommandRunResult[]>([]);
    this._exportResults = new ReplaySubject<any>();
    this._importErrors = new Subject<any[]>();
    //this._commandTemplates$ = new BehaviorSubject<CommandTemplate[]>([]);
    this._selectedCommandTemplateParameters$ = new BehaviorSubject<CommandTemplateParameter[]>([]);
  

    this.wsConnect();

    // get the tables and columns used by the export page
    this.activeConnId$.pipe(mergeMap((connId)=>dataService.tablesWithColumns(connId!).pipe(map((tArray: TableWithColumnsInfo[]) => {
      return (tArray || []).map(t => {
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
    }))))
      .subscribe(trees => {
          this._tablesAndColumnsTree$.next(trees);
        });


    // update the tables to pull in the correct counts if there active connection changes or if there is a data-change notice after import or seeding
    combineLatest([this.activeConnId$,this._dataChangeNotice$])
    .pipe(mergeMap(([connId,_])=>this.dataService.tables(connId!)))
    .subscribe(tables => {
        this._tableList$.next(tables)
      })

    // get the perf test results
    this.activeConnId$
      .pipe(mergeMap((connId)=>this.dataService.perfTestResults(connId!)))
      .subscribe(results=>this._perfTestResults$.next(results))

    // get the command run results
    this.dataService.commandRunResults()
      .subscribe(results=>this._commandRunResults$.next(results));

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
  get exportResults$() {
    return this._exportResults.asObservable();
  }

  private _importErrors: Subject<any>;
  get importErrors$() {
    return this._importErrors.pipe(filter(x=>x.some(Boolean)));
  }

  private _dataChangeNotice$: Subject<any>;
  get dataChangeNotice$() {
    return this._dataChangeNotice$.asObservable();
  }

  private _perfTestResults$: Subject<PerfTestResult[]>;
  get perfTestResults$() {
    return this._perfTestResults$.asObservable();
  }

  // private _commandTemplates$: Subject<CommandTemplate[]>;
  // get commandTemplates$() {
  //   return this._commandTemplates$.asObservable()
  // }

  private _selectedCommandTemplateParameters$: Subject<CommandTemplateParameter[]>;
  get selectedCommandTemplateParameters$() {
    return this._selectedCommandTemplateParameters$.asObservable()
  }

  private _commandRunResults$: Subject<CommandRunResult[]>;
  get commandRunResults$() {
    return this._commandRunResults$.asObservable();
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
    this.activeConnId$.pipe(mergeMap(connId=>
      this.dataService.exportData(exportEntities, connId!))).subscribe({
        next: (res: any) => {
          const json = JSON.stringify(res, null, 4);
          this.fileDownloadService.jsonFileDownload(json, 'export_download.json')
          console.log(res);
          this._exportResults.next(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  importData(jsonData: string) {
    let obj:any;
    try {
      obj = JSON.parse(jsonData);
    }
    catch {
      throw new Error('error reading import file');
    }
    
    this.activeConnId$.pipe(mergeMap(connId=>
      this.dataService.importData(obj, connId!))).subscribe({
        next: (res: any) => {
          //console.log(res);
          const errors = res
            .filter((x: any) => Boolean(x?.exception?.sqlMessage))
            .map((x: any) => {
              return {
                tableName: x.tableName,
                importData: JSON.stringify(x.rowData, null, 4),
                errorMessage: x.exception.sqlMessage
              };
            });
          this._importErrors.next(errors);
          this._dataChangeNotice$.next('import complete');
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getTableData(tableName: string) {
    return this.activeConnId$.pipe(mergeMap(connId=>
      this.dataService.tableData(tableName, connId!).pipe(map(tableData => {
        const cols = tableData.some(Boolean) ? Object.keys(tableData[0]) : [];
        for (const row of tableData) {
          for (const field in row) {
            if (typeof row[field] === "object") {
              row[field] = JSON.stringify(row[field]);
            }
          }
        }
        return {
          data: tableData,
          cols
        };
      }))));
  }

  seedDB(counts: { [tableName: string]: number }) {
    this.activeConnId$.pipe(mergeMap(connId=>
      this.dataService.seedDB(counts,connId!))).subscribe(()=>{
        this._dataChangeNotice$.next('seed complete')
      })
  }

  perfTestReport(reportId:number) {
    return this.dataService.perfTestReport(reportId);
  }

  runPerfTest(connectionId:number, targetVUS:number) {

    const perfTestParams = {
      targetVUS,
      connectionId, // connectionId of dbTools connection table
      reportName:'myReport_' + targetVUS + '.html'
    };

    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        event: 'events',
        data: perfTestParams,
      }))
    } else {
      console.error('WebSocket connection is not open');
    }
  }

  runServerJob(templateId:number, params:any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        event: 'serverJob',
        data: {templateId, params},
      }))
    } else {
      console.error('WebSocket connection is not open');
    }
  }

  commandResultReport(commandRunResultId:number){
    return this.dataService.commandResultReport(commandRunResultId);
  }

  // selectCommandTemplate(templateId:number){
  //   this.dataService.commandTemplateParameters(templateId).subscribe(params=>{
  //     this._selectedCommandTemplateParameters$.next(params);
  //   })
  // }

  




}

