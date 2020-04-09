import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentFileComponent } from './intent-file.component';

describe('IntentFileComponent', () => {
  let component: IntentFileComponent;
  let fixture: ComponentFixture<IntentFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
