import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyObservable } from '../../core/utils/destroy-observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends DestroyObservable implements OnInit {

  loginForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    console.log('POULET');
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private initLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
