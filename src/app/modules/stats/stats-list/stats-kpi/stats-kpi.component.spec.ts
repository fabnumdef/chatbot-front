import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsKpiComponent } from './stats-kpi.component';

describe('StatsKpiComponent', () => {
  let component: StatsKpiComponent;
  let fixture: ComponentFixture<StatsKpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsKpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
