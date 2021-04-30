import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditIntentDialogComponent } from './create-edit-intent-dialog.component';

describe('CreateEditIntentDialogComponent', () => {
  let component: CreateEditIntentDialogComponent;
  let fixture: ComponentFixture<CreateEditIntentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditIntentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditIntentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
