import { Component, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DataService } from '../data.service';
import { map } from 'rxjs';
import { TableInfo } from '../models/tablesWithColumns';
import { Observable } from 'rxjs';
import { ControlValueAccessor } from '@angular/forms';



@Component({
    selector: 'app-tables-and-columns-selector',
    templateUrl: './tables-and-columns-selector.component.html',
    styleUrls: ['./tables-and-columns-selector.component.scss']
})
export class TablesAndColumnsSelectorComponent implements ControlValueAccessor {

    constructor(private dataService: DataService) {
        // this.tables$ = this.dataService.tablesWithColumns().pipe(map((tArray: TableInfo[]) => {
        //     return tArray.map(t => {
        //         return {
        //             key: t.tableName,
        //             label: t.tableName,
        //             icon: 'pi pi-table',
        //             children: t.columns.map(c => {
        //                 return {
        //                     key: c.columnName,
        //                     label: c.columnName,
        //                     data: {
        //                         dataType: c.dataType,
        //                         columnType: c.columnType,
        //                         isNullable: c.isNullable,
        //                         extra: c.extra
        //                     }
        //                 }
        //             })
        //         } as TreeNode
        //     });
        // }));
    }

    onChange = (selectedFields: TreeNode[]) => { };

    onTouched = () => { };

    touched = false;

    disabled = false;

    writeValue(selectedFields: TreeNode[]) {
        this.selectedFields = selectedFields;
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    private _selectedFields: TreeNode[] = [];

    get selectedFields() {
        return this._selectedFields;
    }
    set selectedFields(v:TreeNode[]){
        this._selectedFields = v;
        this.onChange(v);
    }

}


