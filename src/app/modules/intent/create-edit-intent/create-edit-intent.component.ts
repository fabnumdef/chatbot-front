import { Component, Input, OnInit } from '@angular/core';
import { Intent } from '@model/intent.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-edit-intent',
  templateUrl: './create-edit-intent.component.html',
  styleUrls: ['./create-edit-intent.component.scss']
})
export class CreateEditIntentComponent implements OnInit {

  @Input() intent: Intent;

  intentForm: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  get controls() {
    return this.intentForm.controls;
  }

  resetValue(controlName) {
    this.intentForm.get(controlName).setValue(null);
  }

  private _initForm() {
    this.intentForm = this._fb.group({
      id: [this.intent.id, Validators.required],
      expiresAt: [this.intent.expiresAt]
    });
  }

}
