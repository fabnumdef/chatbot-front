import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotTechComponent } from './chatbot-tech.component';

describe('ChatbotTechComponent', () => {
  let component: ChatbotTechComponent;
  let fixture: ComponentFixture<ChatbotTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatbotTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
