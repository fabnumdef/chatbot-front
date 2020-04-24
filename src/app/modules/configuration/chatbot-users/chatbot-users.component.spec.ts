import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotUsersComponent } from './chatbot-users.component';

describe('ChatbotUsersComponent', () => {
  let component: ChatbotUsersComponent;
  let fixture: ComponentFixture<ChatbotUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbotUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
