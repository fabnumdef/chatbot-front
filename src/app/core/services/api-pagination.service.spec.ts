import { TestBed } from '@angular/core/testing';

import { ApiPaginationService } from './api-pagination.service';

describe('ApiPaginationService', () => {
  let service: ApiPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
