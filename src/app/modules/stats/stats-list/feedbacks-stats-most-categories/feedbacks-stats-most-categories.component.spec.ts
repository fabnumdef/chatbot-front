import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksStatsMostCategoriesComponent } from './feedbacks-stats-most-categories.component';

describe('FeedbacksStatsMostCategoriesComponent', () => {
  let component: FeedbacksStatsMostCategoriesComponent;
  let fixture: ComponentFixture<FeedbacksStatsMostCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksStatsMostCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbacksStatsMostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
