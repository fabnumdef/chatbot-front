import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotEmbeddedPreviewComponent } from './chatbot-embedded-preview.component';

describe('ChatbotEmbeddedPreviewComponent', () => {
  let component: ChatbotEmbeddedPreviewComponent;
  let fixture: ComponentFixture<ChatbotEmbeddedPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotEmbeddedPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotEmbeddedPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
