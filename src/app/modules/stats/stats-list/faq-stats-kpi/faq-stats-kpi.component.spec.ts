import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqStatsKpiComponent } from './faq-stats-kpi.component';

describe('FaqStatsKpiComponent', () => {
  let component: FaqStatsKpiComponent;
  let fixture: ComponentFixture<FaqStatsKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqStatsKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqStatsKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
