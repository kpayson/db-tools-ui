import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataReportEmailDialogComponent } from './data-report-email-dialog.component';

describe('DataReportEmailDialogComponent', () => {
  let component: DataReportEmailDialogComponent;
  let fixture: ComponentFixture<DataReportEmailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataReportEmailDialogComponent]
    });
    fixture = TestBed.createComponent(DataReportEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
