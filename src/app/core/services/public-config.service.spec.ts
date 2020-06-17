import { TestBed } from '@angular/core/testing';

import { PublicConfigService } from './public-config.service';

describe('PublicConfigService', () => {
  let service: PublicConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
