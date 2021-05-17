import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentFinderDialogComponent } from './intent-finder-dialog.component';

describe('IntentFinderDialogComponent', () => {
  let component: IntentFinderDialogComponent;
  let fixture: ComponentFixture<IntentFinderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentFinderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentFinderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
