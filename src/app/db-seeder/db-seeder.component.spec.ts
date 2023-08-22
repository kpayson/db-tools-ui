import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSeederComponent } from './db-seeder.component';

describe('DbSeederComponent', () => {
  let component: DbSeederComponent;
  let fixture: ComponentFixture<DbSeederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbSeederComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbSeederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
