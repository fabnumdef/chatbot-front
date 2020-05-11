import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxIntentComponent } from './inbox-intent.component';

describe('InboxIntentComponent', () => {
  let component: InboxIntentComponent;
  let fixture: ComponentFixture<InboxIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
