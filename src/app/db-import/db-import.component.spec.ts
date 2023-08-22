import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbImportComponent } from './db-import.component';

describe('DbImportComponent', () => {
  let component: DbImportComponent;
  let fixture: ComponentFixture<DbImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
