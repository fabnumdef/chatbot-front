import { TestBed } from '@angular/core/testing';

import { ChatFeedbackModalService } from './chat-feedback-modal.service';

describe('ChatFeedbackModalService', () => {
  let service: ChatFeedbackModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatFeedbackModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
