import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqStatsMostQuestionsComponent } from './faq-stats-most-questions.component';

describe('FaqStatsMostQuestionsComponent', () => {
  let component: FaqStatsMostQuestionsComponent;
  let fixture: ComponentFixture<FaqStatsMostQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqStatsMostQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqStatsMostQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
