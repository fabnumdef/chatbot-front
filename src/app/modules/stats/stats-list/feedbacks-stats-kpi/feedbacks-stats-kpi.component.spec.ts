import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksStatsKpiComponent } from './feedbacks-stats-kpi.component';

describe('FeedbacksStatsKpiComponent', () => {
  let component: FeedbacksStatsKpiComponent;
  let fixture: ComponentFixture<FeedbacksStatsKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksStatsKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksStatsKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
