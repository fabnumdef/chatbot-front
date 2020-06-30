import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@model/user.model';
import { UserRole, UserRole_Fr } from '@enum/user-role.enum';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { detailInOutAnimation } from '../../shared/components/chatbot-list-item/chatbot-list-item.animation';

@Component({
  selector: 'app-chatbot-users',
  templateUrl: './chatbot-users.component.html',
  styleUrls: ['./chatbot-users.component.scss', '../configuration-expansion-panel.scss'],
  animations: [
    detailInOutAnimation
  ]
})
export class ChatbotUsersComponent implements OnInit {

  users$: BehaviorSubject<User[]>;
  loading$: BehaviorSubject<boolean>;
  addUser = false;
  userSelected: string = null;
  userRole_Fr = UserRole_Fr;

  constructor(private _userService: UserService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.users$ = this._userService.entities$;
    this.loading$ = this._userService.loading$;
    this._userService.load().subscribe();
  }

  isUserAdmin(user: User) {
    return user.role === UserRole.admin;
  }

  deleteUser(user: User) {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir supprimer l'utilsateur <b>${user.firstName} ${user.lastName}</b> ?
<br/>Cette action est irréversible.`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(() => {
        this._userService.delete(user).subscribe();
      });
  }

  selectUser(userEmail: string) {
    this.userSelected = (this.userSelected === userEmail) ? null : userEmail;
  }

}
