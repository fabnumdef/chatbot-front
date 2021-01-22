import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBestCategoriesComponent } from './stats-best-categories.component';

describe('StatsBestCategoriesComponent', () => {
  let component: StatsBestCategoriesComponent;
  let fixture: ComponentFixture<StatsBestCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsBestCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBestCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
