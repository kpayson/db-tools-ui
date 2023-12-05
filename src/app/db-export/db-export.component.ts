import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
} from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { DbToolsService } from '../db-tools.service';

@Component({
  selector: 'app-db-export',
  templateUrl: './db-export.component.html',
  styleUrls: ['./db-export.component.scss']
})
export class DbExportComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public toolsService: DbToolsService) {}

  treeSelection!: any;

  exportFormGroup = this.fb.group({
    filterConditionsText: ''
  });


  get filterConditionsText() {
    return this.exportFormGroup.get("filterConditionsText")?.value || '';
  }

  ngOnInit() {
    this.treeSelection = [] as TreeNode[];
  }

  exportClick() {
    try {
      this.toolsService.exportData(this.treeSelection, this.filterConditionsText);
    } 
    catch (err) {
      console.log(err);
    }
  }
}
