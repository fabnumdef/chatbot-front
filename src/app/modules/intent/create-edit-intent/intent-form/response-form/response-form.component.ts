import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseType, ResponseType_Fr } from '@enum/response-type.enum';
import { pairwise, startWith, tap } from 'rxjs/operators';
import { Response } from '@model/response.model';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.scss']
})
export class ResponseFormComponent implements OnInit {

  @Input() responseFormArray: FormArray;

  @Input() index: number;

  responseType = ResponseType;
  responseTypeKeys = Object.keys(ResponseType);
  responseType_Fr = ResponseType_Fr;

  constructor(private _fb: FormBuilder) {
  }

  get responseForm(): FormGroup {
    return <FormGroup> this.responseFormArray.at(this.index);
  }

  get previousResponseForm(): FormGroup {
    return <FormGroup> this.responseFormArray.at(this.index - 1);
  }

  get controls() {
    return this.responseForm.controls;
  }

  ngOnInit(): void {
    this.responseForm.get('responseType').valueChanges
      .pipe(
        startWith(this.responseForm.get('responseType').value),
        pairwise(),
        tap(([previousValue, nextValue]) => {
          this.responseForm.get('response')?.setValue(null);
          if ([ResponseType.quick_reply, ResponseType.button, ResponseType.image].includes(previousValue)) {
            if (nextValue === ResponseType.text) {
              this.responseFormArray.removeAt(this.index - 1);
            }
            return;
          }
          if ([ResponseType.quick_reply, ResponseType.button, ResponseType.image].includes(nextValue)) {
            this.responseFormArray.insert(this.index,
              this._getResponseForm({id: null, responseType: ResponseType.text, response: null}));
          }
        })
      )
      .subscribe();
  }

  get responseTypeValue() {
    return this.responseForm.get('responseType')?.value;
  }

  get showText() {
    return [ResponseType.quick_reply, ResponseType.button, ResponseType.image].includes(this.responseTypeValue);
  }

  private _getResponseForm(response: Response) {
    return this._fb.group({
      id: [response.id],
      responseType: [response.responseType, Validators.required],
      response: [response.response, [Validators.required, Validators.maxLength(2000)]]
    });
  }

}
