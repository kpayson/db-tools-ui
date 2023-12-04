import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomViewsUpsertDialogComponent } from '../custom-views-upsert-dialog/custom-views-upsert-dialog.component';
import { CustomViewsStateService } from '../custom-views-state.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomView } from '../models';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-custom-views',
  templateUrl: './custom-views.component.html',
  styleUrls: ['./custom-views.component.scss'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class CustomViewsComponent implements OnInit {

  form!: FormGroup;
  ref: DynamicDialogRef | undefined;

  constructor(
    public state: CustomViewsStateService,
    public dialogService: DialogService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      selectedView: null as CustomView | null,
    });

  }

  get selectedViewId() {
    return this.form.get('selectedTemplate')?.value?.id || null
  }

  selectedViewChange($event: any) {
    this.state.setSelected($event.value);
  }

  editSelectedClick() {
    this.ref = this.dialogService.open(CustomViewsUpsertDialogComponent, {
      data: { mode: 'edit', customView: this.form.get('selectedView')?.value },
      header: 'Add New Custom View',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  addNewClick() {
    this.ref = this.dialogService.open(CustomViewsUpsertDialogComponent, {
      data: { mode: 'new' },
      header: 'Add New Custom View',
      width: '95%',
      height: '95%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  confirmDelete($event: any) {
    if (this.selectedViewId) {
      this.state.delete(this.selectedViewId);
    }
  }

}
