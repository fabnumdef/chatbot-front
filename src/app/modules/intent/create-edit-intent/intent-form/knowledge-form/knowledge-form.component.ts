import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-knowledge-form',
  templateUrl: './knowledge-form.component.html',
  styleUrls: ['./knowledge-form.component.scss']
})
export class KnowledgeFormComponent implements OnInit, AfterViewInit {

  @ViewChild('knowledgeInput') knowledgeInput: ElementRef;

  @Input() knowledgeForm: FormGroup;

  @Output() deleteKnowledge: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() addKnowledge: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.knowledgeForm && this.knowledgeForm.get('question') && this.knowledgeForm.get('question').value === null) {
      this.knowledgeInput.nativeElement.focus();
    }
  }

  get controls() {
    return this.knowledgeForm.controls;
  }

  delete() {
    this.deleteKnowledge.emit(true);
  }

}
