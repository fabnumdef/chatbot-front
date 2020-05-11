import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxPreviewComponent } from './inbox-preview.component';

describe('InboxPreviewComponent', () => {
  let component: InboxPreviewComponent;
  let fixture: ComponentFixture<InboxPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
