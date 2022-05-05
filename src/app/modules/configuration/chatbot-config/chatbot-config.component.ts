import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '@model/config.model';
import { filter, take, takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '@core/utils/utils';
import { AuthService } from '@core/services/auth.service';
import { DestroyObservable } from '@core/utils/destroy-observable';

@Component({
  selector: 'app-chatbot-config',
  templateUrl: './chatbot-config.component.html',
  styleUrls: ['./chatbot-config.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotConfigComponent extends DestroyObservable implements OnInit {

  customizationForm: FormGroup;
  descriptionForm: FormGroup;
  embeddedForm: FormGroup;
  chatbotConfig: Config;
  icons = ['avion.png', 'bateau.png', 'camion.png', 'tank.png', 'parachute.png', 'femme.png', 'homme.png'];
  iconPreview = null;
  embeddedIconPreview = null;

  constructor(private _configService: ConfigService,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private _sanitizer: DomSanitizer,
              private _toastr: ToastrService,
              private _authService: AuthService,
              @Inject(Window) private _window: Window) {
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

  get customizationControls() {
    return this.customizationForm.controls;
  }

  get embeddedControls() {
    return this.embeddedForm.controls;
  }

  get descriptionControls() {
    return this.descriptionForm.controls;
  }

  get fullConfiguration() {
    return {...this.customizationForm.getRawValue(), ...this.embeddedForm.getRawValue(), ...this.descriptionForm.getRawValue()};
  }

  uploadIcon($event, embedded = false) {
    const file = $event.target.files[0];
    if (!file) {
      return;
    }
    this._storeIcon(file, embedded);
    $event.target.value = '';
  }

  selectIcon(iconName: string) {
    this._http.get('assets/img/icons/' + iconName, {responseType: 'blob'}).subscribe((file: any) => {
      file.name = iconName;
      this._storeIcon(file);
    });
  }

  resetIconFile() {
    this.iconPreview = null;
    this.customizationControls.icon.setValue(null);
  }

  resetEmbeddedIconFile() {
    this.embeddedIconPreview = null;
    this.embeddedControls.embeddedIcon.setValue(null);
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  saveCustomization() {
    this._configService.saveConfig(Utils.getDirtyValues(this.customizationForm)).subscribe(() => {
      this._toastr.success('La personnalisation du chatbot a bien été modifiée');
      this.customizationForm.markAsPristine();
    });
  }

  saveEmbedded() {
    this._configService.saveConfig(Utils.getDirtyValues(this.embeddedForm)).subscribe(() => {
      this._toastr.success('La personnalisation en plein écran du chatbot a bien été modifiée');
      this.embeddedForm.markAsPristine();
    });
  }

  saveDescription() {
    this._configService.saveConfig(Utils.getDirtyValues(this.descriptionForm)).subscribe(() => {
      this._toastr.success('La description du chatbot a bien été modifiée');
      this.descriptionForm.markAsPristine();
    });
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private _storeIcon(file: any, embedded = false) {
    if (!embedded) {
      this.iconPreview = null;
      this.customizationControls.icon.setValue(file);
      this.customizationControls.icon.markAsDirty();
    } else {
      this.embeddedIconPreview = null;
      this.embeddedControls.embeddedIcon.setValue(file);
      this.embeddedControls.embeddedIcon.markAsDirty();
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      if (!embedded) {
        this.iconPreview = this._sanitizer.bypassSecurityTrustResourceUrl(<string> reader.result);
      } else {
        this.embeddedIconPreview = this._sanitizer.bypassSecurityTrustResourceUrl(<string> reader.result);
      }
    };
  }

  private _initForms() {
    this.customizationForm = this._fb.group({
      name: [this.chatbotConfig.name, [Validators.required, Validators.maxLength(50)]],
      function: [this.chatbotConfig.function, [Validators.maxLength(50)]],
      icon: [this.chatbotConfig.icon, [Validators.required, Validators.maxLength(50)]],
      primaryColor: [this.chatbotConfig.primaryColor, [Validators.required, Validators.maxLength(20)]],
      secondaryColor: [this.chatbotConfig.secondaryColor, [Validators.required, Validators.maxLength(20)]],
    });
    this.embeddedForm = this._fb.group({
      embeddedIcon: [this.chatbotConfig.embeddedIcon, [Validators.maxLength(50)]],
      description: [this.chatbotConfig.description, [Validators.maxLength(255)]],
      helpBtn: [this.chatbotConfig.helpBtn, [Validators.maxLength(20)]],
      chatBtn: [this.chatbotConfig.chatBtn, [Validators.maxLength(25)]],
      faqBtn: [this.chatbotConfig.faqBtn, [Validators.maxLength(25)]],
      help: [this.chatbotConfig.help, [Validators.maxLength(500)]],
      showIntentSearch: [this.chatbotConfig.showIntentSearch, [Validators.required]],
      showFaq: [this.chatbotConfig.showFaq, [Validators.required]],
      showFallbackSuggestions: [this.chatbotConfig.showFallbackSuggestions, [Validators.required]],
    });
    this.descriptionForm = this._fb.group({
      problematic: [this.chatbotConfig.problematic, [Validators.required, Validators.maxLength(200)]],
      audience: [this.chatbotConfig.audience, [Validators.required, Validators.maxLength(200)]],
    });

    if (!!this.chatbotConfig.icon) {
      this._http.get(`${this.mediaPath}${encodeURI(this.chatbotConfig.icon)}`, {responseType: 'blob'}).subscribe((file: any) => {
        file.name = this.chatbotConfig.icon;
        this._storeIcon(file);
        this.customizationForm.markAsPristine();
      });
    }

    if (!!this.chatbotConfig.embeddedIcon) {
      this._http.get(`${this.mediaPath}${encodeURI(this.chatbotConfig.embeddedIcon)}`, {responseType: 'blob'}).subscribe((file: any) => {
        file.name = this.chatbotConfig.embeddedIcon;
        this._storeIcon(file, true);
        this.customizationForm.markAsPristine();
      });
    }

    if (this._authService.user.role !== 'admin') {
      this.customizationForm.disable();
      this.descriptionForm.disable();
      this.embeddedForm.disable();
    }
  }

}
