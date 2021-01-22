import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPaginationElementsComponent } from './select-pagination-elements.component';

describe('SelectPaginationElementsComponent', () => {
  let component: SelectPaginationElementsComponent;
  let fixture: ComponentFixture<SelectPaginationElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPaginationElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaginationElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
