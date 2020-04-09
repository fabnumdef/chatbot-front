import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotListItemComponent } from './chatbot-list-item.component';

describe('ChatbotListItemComponent', () => {
  let component: ChatbotListItemComponent;
  let fixture: ComponentFixture<ChatbotListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
