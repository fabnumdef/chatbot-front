import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHelpModalComponent } from './chat-help-modal.component';

describe('ChatHelpModalComponent', () => {
  let component: ChatHelpModalComponent;
  let fixture: ComponentFixture<ChatHelpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatHelpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatHelpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
