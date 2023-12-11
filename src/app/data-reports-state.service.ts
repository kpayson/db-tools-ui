import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityStateService } from './entity-state.service';
import { DataReport } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataReportsStateService extends EntityStateService<DataReport> {

  constructor(dataService: DataService) {
    super({
      getAll: () => dataService.dataReports(), 
      add: (entity: DataReport) => dataService.dataReportAdd(entity),
      update: (entity: DataReport) => dataService.dataReportUpdate(entity),
      delete: (id: number) => dataService.dataReportDelete(id)
    })
   }
}
