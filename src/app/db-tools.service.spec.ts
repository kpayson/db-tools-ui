import { TestBed } from '@angular/core/testing';

import { DbToolsService } from './db-tools.service';

describe('DbToolsService', () => {
  let service: DbToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
