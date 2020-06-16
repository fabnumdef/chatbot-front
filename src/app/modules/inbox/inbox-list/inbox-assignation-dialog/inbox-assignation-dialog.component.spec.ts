import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxAssignationDialogComponent } from './inbox-assignation-dialog.component';

describe('InboxAssignationDialogComponent', () => {
  let component: InboxAssignationDialogComponent;
  let fixture: ComponentFixture<InboxAssignationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxAssignationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxAssignationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
