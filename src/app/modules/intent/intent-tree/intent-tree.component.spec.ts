import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentTreeComponent } from './intent-tree.component';

describe('IntentTreeComponent', () => {
  let component: IntentTreeComponent;
  let fixture: ComponentFixture<IntentTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
