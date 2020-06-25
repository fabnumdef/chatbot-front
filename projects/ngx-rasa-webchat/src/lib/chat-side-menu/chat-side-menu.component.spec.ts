import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSideMenuComponent } from './chat-side-menu.component';

describe('ChatSideMenuComponent', () => {
  let component: ChatSideMenuComponent;
  let fixture: ComponentFixture<ChatSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
