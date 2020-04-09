import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentLayoutComponent } from './intent-layout.component';

describe('IntentLayoutComponent', () => {
  let component: IntentLayoutComponent;
  let fixture: ComponentFixture<IntentLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
