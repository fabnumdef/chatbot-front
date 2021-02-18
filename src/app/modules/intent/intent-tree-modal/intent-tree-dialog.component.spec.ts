import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentTreeDialogComponent } from './intent-tree-dialog.component';

describe('IntentTreeModalComponent', () => {
  let component: IntentTreeDialogComponent;
  let fixture: ComponentFixture<IntentTreeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentTreeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentTreeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
