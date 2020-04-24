import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotConfigComponent } from './chatbot-config.component';

describe('ChatbotConfigComponent', () => {
  let component: ChatbotConfigComponent;
  let fixture: ComponentFixture<ChatbotConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
