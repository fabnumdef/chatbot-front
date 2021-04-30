import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentFullTreeComponent } from './intent-full-tree.component';

describe('IntentFullTreeComponent', () => {
  let component: IntentFullTreeComponent;
  let fixture: ComponentFixture<IntentFullTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentFullTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentFullTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
