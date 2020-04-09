import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLayoutComponent } from './media-layout.component';

describe('MediaLayoutComponent', () => {
  let component: MediaLayoutComponent;
  let fixture: ComponentFixture<MediaLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
