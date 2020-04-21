import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFileFormComponent } from './image-file-form.component';

describe('ImageFileFormComponent', () => {
  let component: ImageFileFormComponent;
  let fixture: ComponentFixture<ImageFileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
