import { Component, OnInit } from '@angular/core';
import { Config } from '@model/config.model';
import { ConfigService } from '@core/services/config.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Utils } from '@core/utils/utils';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';
import { AdminService } from '@core/services/admin.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-chatbot-tech',
  templateUrl: './chatbot-tech.component.html',
  styleUrls: ['./chatbot-tech.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotTechComponent extends DestroyObservable implements OnInit {

  techForm: FormGroup;

  chatbotConfig: Config;

  constructor(private _configService: ConfigService,
              private _adminService: AdminService,
              private _fb: FormBuilder,
              private _toastr: ToastrService,
              private _clipboard: Clipboard,
    private _dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this._configService.config$.pipe(
      filter(c => !!c),
      takeUntil(this.destroy$),
      take(1)
    ).subscribe(config => {
      // console.log(config);
      this.chatbotConfig = config;
      this._initForms();
    });
  }

  resetData() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      data: {
        message: `Êtes-vous sûr de vouloir réinitialiser votre bot, toutes vos données seront supprimées </b> et votre bot va temporairement être instable </b> ?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed()
      .pipe(filter(r => !!r))
      .subscribe(() => {
        this._adminService.resetData();
      });
  }

  saveTechConfig() {
    this._configService.saveConfig(Utils.getDirtyValues(this.techForm)).subscribe(() => {
      this._toastr.success('La configuration technique du chatbot a bien été modifiée');
      this.techForm.markAsPristine();
    });
  }

  copyToClipboard(value: string) {
    this._clipboard.copy(value);
    this._toastr.success('Copié dans le presse-papier');
  }

  get delayBetweenMessagesControl(): FormControl {
    return <FormControl> this.techForm.get('delayBetweenMessages');
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private _initForms() {
    this.techForm = this._fb.group({
      storage: [this.chatbotConfig.storage, [Validators.required]],
      apiKey: [{value: this.chatbotConfig.apiKey, disabled: true}, [Validators.required]],
      delayBetweenMessages: [this.chatbotConfig.delayBetweenMessages, [Validators.required, Validators.min(0), Validators.max(10000)]],
      isTree: [this.chatbotConfig.isTree, [Validators.required]],
    });
  }

}
