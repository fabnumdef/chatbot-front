import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFeedbackModalComponent } from './chat-feedback-modal.component';

describe('ChatFeedbackModalComponent', () => {
  let component: ChatFeedbackModalComponent;
  let fixture: ComponentFixture<ChatFeedbackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatFeedbackModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
