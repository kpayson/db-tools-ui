import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfTestResultsDialogComponent } from './perf-test-results-dialog.component';

describe('PerfTestResultsDialogComponent', () => {
  let component: PerfTestResultsDialogComponent;
  let fixture: ComponentFixture<PerfTestResultsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfTestResultsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfTestResultsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
