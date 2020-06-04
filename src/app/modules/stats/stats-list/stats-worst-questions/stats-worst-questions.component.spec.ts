import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsWorstQuestionsComponent } from './stats-worst-questions.component';

describe('StatsBestQuestionsComponent', () => {
  let component: StatsWorstQuestionsComponent;
  let fixture: ComponentFixture<StatsWorstQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsWorstQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsWorstQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
