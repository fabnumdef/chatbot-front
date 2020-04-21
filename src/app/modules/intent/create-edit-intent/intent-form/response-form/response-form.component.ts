import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ResponseType, ResponseType_Fr } from '@enum/response-type.enum';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.scss']
})
export class ResponseFormComponent implements OnInit {

  @Input() responseForm: FormGroup;

  @Input() set canChooseAllResponseTypes(value: boolean) {
    this.responseTypeKeys = value ? Object.keys(ResponseType) : [ResponseType.text];
  }

  responseType = ResponseType;
  responseTypeKeys;
  responseType_Fr = ResponseType_Fr;

  constructor() {
  }

  get controls() {
    return this.responseForm.controls;
  }

  ngOnInit(): void {
    this.responseForm.get('responseType').valueChanges.subscribe(() => {
      this.responseForm.get('response').setValue(null);
    });
  }

  get responseTypeValue() {
    return this.responseForm.get('responseType')?.value;
  }

}
