import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaListDialogComponent } from './media-list-dialog.component';

describe('MediaListComponent', () => {
  let component: MediaListDialogComponent;
  let fixture: ComponentFixture<MediaListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
