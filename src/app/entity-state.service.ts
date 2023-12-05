import { BehaviorSubject, Observable, filter, map  } from 'rxjs';

interface Entity {
    id?: number;
}

export interface CrudStateActions<Entity> {
    getAll: () => Observable<Entity[]>,
    add: (entity:Entity) => Observable<Entity>,
    update: (entity:Entity) => Observable<Entity>,
    delete: (id:number) => any
}

export class EntityStateService<T extends Entity> {

  _entities$ = new BehaviorSubject<T[]>([]);
  _selectedEntityId: number | undefined = undefined;

  constructor(private crudActions:CrudStateActions<T>) {
    crudActions.getAll().subscribe(entities => {
      this. _entities$.next(entities);
    })
  }

  public get entities$() {
    return this._entities$.asObservable();
  }

  public get selectedEntity() { 
    return this._entities$.value.find(c=>c.id === this._selectedEntityId);
  }

  public add(entity:T) {
    this.crudActions.add(entity).subscribe(entity => {
      this._entities$.next([...this._entities$.value, entity]);
    })
  }

  public update(entity:T) {
    this.crudActions.update(entity).subscribe(() => {
      this._entities$.next([...this._entities$.value.map(c=>c.id === entity.id ? entity : c)]);
    })
  }

  public setSelected(entity:T) {
    this._selectedEntityId = entity.id
  }

  public delete(id:number) {
    this.crudActions.delete(id).subscribe((res:any) => {
      this._entities$.next([...this._entities$.value.filter(c=>c.id !== id)]);
    })
  }


}
