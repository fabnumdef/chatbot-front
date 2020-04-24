import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '@enum/user-role.enum';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userRole = Object.keys(UserRole);

  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _fb: FormBuilder,
              private _userService: UserService) {
  }

  ngOnInit(): void {
    this._initForm();
  }

  get controls() {
    return this.userForm.controls;
  }

  addUser() {
    this._userService.create(this.userForm.getRawValue()).subscribe(() => {
      this.cancel.emit(true);
    });
  }

  onCancel() {
    this.cancel.emit(true);
  }

  private _initForm() {
    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      role: [UserRole.reader, [Validators.required]]
    });
  }

}
