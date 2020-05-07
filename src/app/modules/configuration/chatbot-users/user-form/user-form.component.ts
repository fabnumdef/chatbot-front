import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRole } from '@enum/user-role.enum';
import { UserService } from '@core/services/user.service';
import { User } from '@model/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  userRole = Object.keys(UserRole);

  @Input() user: User = new User();
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
    (this.isNewUser ? this._userService.create(this.userForm.getRawValue()) : this._userService.save(this.userForm.getRawValue()))
      .subscribe(() => {
        this.cancel.emit(true);
      });
  }

  onCancel() {
    this.cancel.emit(true);
  }

  get isNewUser(): boolean {
    return this.userForm.controls.isNewUser.value;
  }

  private _initForm() {
    this.userForm = this._fb.group({
      isNewUser: [!this.user.email],
      firstName: [this.user.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user.lastName, [Validators.required, Validators.maxLength(50)]],
      email: [this.user.email, [Validators.required, Validators.maxLength(255), Validators.email]],
      role: [this.user.role, [Validators.required]]
    });
  }

}
