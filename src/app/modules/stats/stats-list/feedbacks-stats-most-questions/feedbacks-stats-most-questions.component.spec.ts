import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksStatsMostQuestionsComponent } from './feedbacks-stats-most-questions.component';

describe('FeedbacksStatsMostQuestionsComponent', () => {
  let component: FeedbacksStatsMostQuestionsComponent;
  let fixture: ComponentFixture<FeedbacksStatsMostQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksStatsMostQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksStatsMostQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
