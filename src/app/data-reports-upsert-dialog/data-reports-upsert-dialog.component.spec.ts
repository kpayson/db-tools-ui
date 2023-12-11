import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReportsUpsertDialogComponent } from './data-reports-upsert-dialog.component';

describe('DataReportsUpsertDialogComponent', () => {
  let component: DataReportsUpsertDialogComponent;
  let fixture: ComponentFixture<DataReportsUpsertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataReportsUpsertDialogComponent]
    });
    fixture = TestBed.createComponent(DataReportsUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
