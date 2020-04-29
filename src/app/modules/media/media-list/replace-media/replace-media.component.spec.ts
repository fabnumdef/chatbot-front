import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceMediaComponent } from './replace-media.component';

describe('ReplaceMediaComponent', () => {
  let component: ReplaceMediaComponent;
  let fixture: ComponentFixture<ReplaceMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaceMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
