import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentListComponent } from './intent-list.component';

describe('IntentListComponent', () => {
  let component: IntentListComponent;
  let fixture: ComponentFixture<IntentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
