import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickReplyFormComponent } from './quick-reply-form.component';

describe('QuickReplyFormComponent', () => {
  let component: QuickReplyFormComponent;
  let fixture: ComponentFixture<QuickReplyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickReplyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickReplyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
