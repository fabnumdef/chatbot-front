import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ResponseType } from '@enum/*';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent implements OnInit {

  @Input() responseFormControl: FormControl;
  buttonsForm: FormArray;
  responseType = ResponseType;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._initFormArray();
    this._subscribeFormArray();
  }

  get buttonsFormControls(): FormControl[] {
    return <FormControl[]> this.buttonsForm.controls;
  }

  addChoice() {
    this.buttonsForm.push(this._initFormControl());
  }

  deleteChoice(idx: number) {
    this.buttonsForm.removeAt(idx);
  }

  private _initFormArray() {
    this.buttonsForm = this._fb.array([]);

    const value = this.responseFormControl.value;
    if (!value) {
      return this.buttonsForm.push(this._initFormControl());
    }
    value.split(';').forEach(v => {
      this.buttonsForm.push(this._initFormControl(v));
    });
  }

  private _initFormControl(value: string = '') {
    return this._fb.control(value, Validators.required);
  }

  private _subscribeFormArray() {
    this.buttonsForm.valueChanges.subscribe(value => {
      if (!this.buttonsForm.valid) {
        return this.responseFormControl.setValue(null);
      }
      this.responseFormControl.setValue(
        value.join(';')
      );
      this.responseFormControl.markAsDirty();
    });
  }

}
