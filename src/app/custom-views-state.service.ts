import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { EntityStateService } from './entity-state.service';
import { CustomView } from './models';

@Injectable({
  providedIn: 'root'
})
export class CustomViewsStateService extends EntityStateService<CustomView> {

  constructor(dataService: DataService) {
    super({
      getAll: () => dataService.customViews(), 
      add: (entity: CustomView) => dataService.customViewAdd(entity),
      update: (entity: CustomView) => dataService.customViewUpdate(entity),
      delete: (id: number) => dataService.customViewDelete(id)
    })
   }
}
