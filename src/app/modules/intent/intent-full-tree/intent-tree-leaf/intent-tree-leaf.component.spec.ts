import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentTreeLeafComponent } from './intent-tree-leaf.component';

describe('IntentTreeLeafComponent', () => {
  let component: IntentTreeLeafComponent;
  let fixture: ComponentFixture<IntentTreeLeafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentTreeLeafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentTreeLeafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
