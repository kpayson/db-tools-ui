import { TestBed } from '@angular/core/testing';

import { CustomViewsStateService } from './custom-views-state.service';

describe('CustomViewsStateService', () => {
  let service: CustomViewsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomViewsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
