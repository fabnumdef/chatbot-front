import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxFilterComponent } from './inbox-filter.component';

describe('InboxFilterComponent', () => {
  let component: InboxFilterComponent;
  let fixture: ComponentFixture<InboxFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
