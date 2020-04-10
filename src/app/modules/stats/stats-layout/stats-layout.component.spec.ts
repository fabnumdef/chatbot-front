import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsLayoutComponent } from './stats-layout.component';

describe('StatsLayoutComponent', () => {
  let component: StatsLayoutComponent;
  let fixture: ComponentFixture<StatsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
