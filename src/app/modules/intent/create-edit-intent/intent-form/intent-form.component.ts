import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intent } from '@model/intent.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Response } from '@model/response.model';
import { ResponseType } from '@enum/response-type.enum';
import { Knowledge } from '@model/knowledge.model';
import { IntentService } from '@core/services/intent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intent-form',
  templateUrl: './intent-form.component.html',
  styleUrls: ['./intent-form.component.scss']
})
export class IntentFormComponent implements OnInit {

  @Input() intent: Intent;
  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  intentForm: FormGroup;

  panelHeight = '30px';

  constructor(private _fb: FormBuilder,
              private _toastr: ToastrService,
              private _router: Router,
              private _intentService: IntentService) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  get controls() {
    return this.intentForm.controls;
  }

  get isNewIntent(): boolean {
    return this.intentForm.get('isNewIntent').value;
  }

  get responsesFormArray(): FormArray {
    return <FormArray> this.intentForm.get('responses');
  }

  get knowledgesFormArray(): FormArray {
    return <FormArray> this.intentForm.get('knowledges');
  }

  resetValue(controlName) {
    this.intentForm.get(controlName).setValue(null);
  }

  getTitle() {
    return this.isNewIntent ? 'Créer une nouvelle connaissance' : 'Modifier une connaissance';
  }

  addResponse() {
    this.responsesFormArray.push(this._getResponseForm(new Response()));
  }

  addKnowledge() {
    this.knowledgesFormArray.push(this._getKnowledgeForm(new Knowledge()));
  }

  canChooseAllResponseTypes(idx: number): boolean {
    const formGroup = <FormGroup> this.responsesFormArray.at(idx - 1);
    if (!formGroup) {
      return false;
    }
    return formGroup.getRawValue().responseType === ResponseType.text;
  }

  canDeleteResponse(idx: number): boolean {
    if (this.responsesFormArray.length <= 1) {
      return false;
    }
    const formGroup = <FormGroup> this.responsesFormArray.at(idx);
    if (formGroup.getRawValue().responseType !== ResponseType.text) {
      return true;
    }
    const previousFormGroup = <FormGroup> this.responsesFormArray.at(idx - 1);
    const nextFormGroup = <FormGroup> this.responsesFormArray.at(idx + 1);
    return previousFormGroup && previousFormGroup.getRawValue().responseType === ResponseType.text ||
      nextFormGroup && nextFormGroup.getRawValue().responseType === ResponseType.text;
  }

  deleteResponse(idx: number): void {
    this.responsesFormArray.removeAt(idx);
  }

  deleteKnowledge(idx: number): void {
    this.knowledgesFormArray.removeAt(idx);
  }

  saveIntent() {
    this._intentService.create(this.intentForm.getRawValue()).subscribe(intent => {
      this._toastr.success('Connaissance sauvegardée');
      this.close.emit(true);
    });
  }

  cancel() {
    if (this.isNewIntent) {
      return this._router.navigateByUrl('/connaissances');
    }
    this.close.emit(true);
  }

  private _initForm() {
    this.intentForm = this._fb.group({
      isNewIntent: [!this.intent.id],
      id: [this.intent.id, [Validators.required, Validators.pattern('[a-zA-Z0-9_-]*'), Validators.maxLength(100)]],
      mainQuestion: [this.intent.mainQuestion, [Validators.required, Validators.maxLength(255)]],
      category: [this.intent.category, [Validators.maxLength(255)]],
      responses: this._fb.array(this._initResponsesForm()),
      knowledges: this._fb.array(this._initKnowledgesForm()),
      expiresAt: [this.intent.expiresAt]
    });
  }

  private _initResponsesForm(): FormGroup[] {
    const formGroups = [];

    this.intent.responses.forEach(response => {
      formGroups.push(this._getResponseForm(response));
    });

    return formGroups;
  }

  private _initKnowledgesForm(): FormGroup[] {
    const formGroups = [];

    this.intent.knowledges.forEach(knowledge => {
      formGroups.push(this._getKnowledgeForm(knowledge));
    });

    return formGroups;
  }

  private _getResponseForm(response: Response) {
    return this._fb.group({
      id: [response.id],
      responseType: [response.responseType, Validators.required],
      response: [response.response, [Validators.required, Validators.maxLength(2000)]]
    });
  }

  private _getKnowledgeForm(knowledge: Knowledge) {
    return this._fb.group({
      id: [knowledge.id],
      question: [knowledge.question, [Validators.required, Validators.maxLength(255)]]
    });
  }

}
