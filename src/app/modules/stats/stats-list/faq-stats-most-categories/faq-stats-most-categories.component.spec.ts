import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqStatsMostCategoriesComponent } from './faq-stats-most-categories.component';

describe('FaqStatsMostCategoriesComponent', () => {
  let component: FaqStatsMostCategoriesComponent;
  let fixture: ComponentFixture<FaqStatsMostCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqStatsMostCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqStatsMostCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
