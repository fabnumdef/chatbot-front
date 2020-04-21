import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeFormComponent } from './knowledge-form.component';

describe('KnowledgeFormComponent', () => {
  let component: KnowledgeFormComponent;
  let fixture: ComponentFixture<KnowledgeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowledgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
