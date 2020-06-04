import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsBestQuestionsComponent } from './stats-best-questions.component';

describe('StatsBestQuestionsComponent', () => {
  let component: StatsBestQuestionsComponent;
  let fixture: ComponentFixture<StatsBestQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsBestQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsBestQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
