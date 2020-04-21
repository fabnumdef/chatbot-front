import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-knowledge-form',
  templateUrl: './knowledge-form.component.html',
  styleUrls: ['./knowledge-form.component.scss']
})
export class KnowledgeFormComponent implements OnInit {

  @Input() knowledgeForm: FormGroup;
  @Output() deleteKnowledge: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  get controls() {
    return this.knowledgeForm.controls;
  }

  delete() {
    this.deleteKnowledge.emit(true);
  }

}
