import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaIntentsComponent } from './media-intents.component';

describe('MediaIntentsComponent', () => {
  let component: MediaIntentsComponent;
  let fixture: ComponentFixture<MediaIntentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaIntentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaIntentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
