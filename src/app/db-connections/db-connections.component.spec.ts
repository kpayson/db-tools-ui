import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbConnectionsComponent } from './db-connections.component';

describe('DbConnectionsComponent', () => {
  let component: DbConnectionsComponent;
  let fixture: ComponentFixture<DbConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbConnectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
