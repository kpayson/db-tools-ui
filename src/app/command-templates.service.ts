import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { CommandTemplate, CommandTemplateParameter } from './models';

@Injectable({
  providedIn: 'root'
})
export class CommandTemplatesService {

  _commandTemplates$ = new BehaviorSubject<CommandTemplate[]>([]);

  //_selectedTemplateParams$ = new BehaviorSubject<CommandTemplateParameter[]>([]);

  constructor(private dataService: DataService) {
    this.dataService.commandTemplates().subscribe(templates => {
      this._commandTemplates$.next(templates);
    })
  }

  public get commandTemplates$() {
    return this._commandTemplates$.asObservable();
  }

  public addCommandTemplate(template:CommandTemplate) {
    this.dataService.commandTemplateAdd(template).subscribe(template => {
      this._commandTemplates$.next([...this._commandTemplates$.value, template]);
    })
  }

  public updateCommandTemplate(template:CommandTemplate) {
    this.dataService.commandTemplateUpdate(template).subscribe(res => {
      this._commandTemplates$.next([...this._commandTemplates$.value.filter(c=>c.id !== template.id), template]);
    })
  }

  public deleteCommandTemplate(templateId:number) {
    this.dataService.commandTemplateDelete(templateId).subscribe(res => {
      this._commandTemplates$.next([...this._commandTemplates$.value.filter(c=>c.id !== templateId)]);
    })
  }


}
