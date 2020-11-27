import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMaintenanceModeComponent } from './chat-maintenance-mode.component';

describe('ChatMaintenanceModeComponent', () => {
  let component: ChatMaintenanceModeComponent;
  let fixture: ComponentFixture<ChatMaintenanceModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMaintenanceModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMaintenanceModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
