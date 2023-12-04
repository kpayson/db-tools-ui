import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomViewsUpsertDialogComponent } from './custom-views-upsert-dialog.component';

describe('CustomViewsUpsertDialogComponent', () => {
  let component: CustomViewsUpsertDialogComponent;
  let fixture: ComponentFixture<CustomViewsUpsertDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomViewsUpsertDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomViewsUpsertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
