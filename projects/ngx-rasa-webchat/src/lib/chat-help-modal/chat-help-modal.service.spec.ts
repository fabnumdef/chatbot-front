import { TestBed } from '@angular/core/testing';

import { ChatHelpModalService } from './chat-help-modal.service';

describe('ChatHelpModalService', () => {
  let service: ChatHelpModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatHelpModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
