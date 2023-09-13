import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerScriptsComponent } from './server-scripts.component';

describe('ServerScriptsComponent', () => {
  let component: ServerScriptsComponent;
  let fixture: ComponentFixture<ServerScriptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerScriptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerScriptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
