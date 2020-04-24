import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotAccessComponent } from './chatbot-access.component';

describe('ChatbotAccessComponent', () => {
  let component: ChatbotAccessComponent;
  let fixture: ComponentFixture<ChatbotAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
