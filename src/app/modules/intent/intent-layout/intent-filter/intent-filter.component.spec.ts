import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentFilterComponent } from './intent-filter.component';

describe('IntentFilterComponent', () => {
  let component: IntentFilterComponent;
  let fixture: ComponentFixture<IntentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
