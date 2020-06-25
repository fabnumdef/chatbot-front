import { TestBed } from '@angular/core/testing';

import { NgxRasaWebchatService } from './ngx-rasa-webchat.service';

describe('NgxRasaWebchatService', () => {
  let service: NgxRasaWebchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxRasaWebchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
