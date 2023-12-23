import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendReportEmailDialogComponent } from './send-report-email-dialog.component';

describe('SendReportEmailDialogComponent', () => {
  let component: SendReportEmailDialogComponent;
  let fixture: ComponentFixture<SendReportEmailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendReportEmailDialogComponent]
    });
    fixture = TestBed.createComponent(SendReportEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
