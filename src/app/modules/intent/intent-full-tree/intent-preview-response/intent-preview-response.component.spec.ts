import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentPreviewResponseComponent } from './intent-preview-response.component';

describe('IntentPreviewResponsesComponent', () => {
  let component: IntentPreviewResponseComponent;
  let fixture: ComponentFixture<IntentPreviewResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentPreviewResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentPreviewResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
