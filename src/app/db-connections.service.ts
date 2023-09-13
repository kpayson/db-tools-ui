import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, ReplaySubject, map, filter } from 'rxjs';
import { TableInfo, TableWithColumnsInfo } from './models/tablesWithColumns';
import { Observable, Subject } from 'rxjs';
import { DBConnection } from './models/dbConnection';


@Injectable({
  providedIn: 'root'
})
export class DbConnectionsService {

  _databaseConnections$ = new BehaviorSubject<DBConnection[]>([]);
  _selectedConnection = new BehaviorSubject<DBConnection | null>(null)

  constructor(private dataService: DataService) {
    this.dataService.connections().subscribe(connections => {
      this._databaseConnections$.next(connections);
      this._selectedConnection.next(connections.some(Boolean) ? connections[0] : null)
    })
  }

  public get databaseConnections() {
    return this._databaseConnections$.asObservable();
  }

  public get activeConnection() {
    return this._selectedConnection.pipe(filter(Boolean));
  }

  public setActiveConnection(connection:DBConnection) {
    this._selectedConnection.next(connection);
  }
}
