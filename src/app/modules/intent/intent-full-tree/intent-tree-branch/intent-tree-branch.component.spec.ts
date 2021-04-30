import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentTreeBranchComponent } from './intent-tree-branch.component';

describe('IntentTreeBranchComponent', () => {
  let component: IntentTreeBranchComponent;
  let fixture: ComponentFixture<IntentTreeBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentTreeBranchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentTreeBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
