import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject, filter } from 'rxjs';
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

  public addConnection(connection:DBConnection) {
    this.dataService.connectionAdd(connection).subscribe(connection => {
      this._databaseConnections$.next([...this._databaseConnections$.value, connection]);
      this._selectedConnection.next(connection);
    })
  }

  public updateConnection(connection:DBConnection) {
    this.dataService.connectionUpdate(connection).subscribe(res => {
      this._databaseConnections$.next(
        this._databaseConnections$.value.map(c => c.id === connection.id ? connection : c)
      );
      this._selectedConnection.next(connection);
    })
  }

  public deleteConnection(connectionId:number) {
    this.dataService.connectionDelete(connectionId).subscribe(res => {
      this._databaseConnections$.next([...this._databaseConnections$.value.filter(c=>c.id !== connectionId)]);
      this._selectedConnection.next(this._databaseConnections$.value.length > 0 ? this._databaseConnections$.value[0]: null);
    })
  }

  public setActiveConnection(connection:DBConnection) {
    this._selectedConnection.next(connection);
  }
}
