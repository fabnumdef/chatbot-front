import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditIntentComponent } from './create-edit-intent.component';

describe('CreateEditIntentComponent', () => {
  let component: CreateEditIntentComponent;
  let fixture: ComponentFixture<CreateEditIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
