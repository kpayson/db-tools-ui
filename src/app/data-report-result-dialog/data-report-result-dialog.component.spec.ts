import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReportResultDialogComponent } from './data-report-result-dialog.component';

describe('DataReportResultDialogComponent', () => {
  let component: DataReportResultDialogComponent;
  let fixture: ComponentFixture<DataReportResultDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataReportResultDialogComponent]
    });
    fixture = TestBed.createComponent(DataReportResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
