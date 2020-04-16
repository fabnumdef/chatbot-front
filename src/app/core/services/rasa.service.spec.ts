import { TestBed } from '@angular/core/testing';

import { RasaService } from './rasa.service';

describe('RasaService', () => {
  let service: RasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
