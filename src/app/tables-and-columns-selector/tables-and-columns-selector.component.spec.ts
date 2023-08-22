import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesAndColumnsSelectorComponent } from './tables-and-columns-selector.component';

describe('TablesAndColumnsSelectorComponent', () => {
  let component: TablesAndColumnsSelectorComponent;
  let fixture: ComponentFixture<TablesAndColumnsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablesAndColumnsSelectorComponent]
    });
    fixture = TestBed.createComponent(TablesAndColumnsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
