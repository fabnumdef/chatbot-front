import { Component, Inject, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '@model/config.model';
import { filter } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'app-chatbot-config',
  templateUrl: './chatbot-config.component.html',
  styleUrls: ['./chatbot-config.component.scss']
})
export class ChatbotConfigComponent implements OnInit {

  customizationForm: FormGroup;
  descriptionForm: FormGroup;
  chatbotConfig: Config;
  icons = ['avion.svg', 'bateau.svg', 'camion.svg', 'tank.svg', 'parachute.svg', 'femme.svg', 'homme.svg'];
  iconPreview = null;

  constructor(private _configService: ConfigService,
              private _fb: FormBuilder,
              private _http: HttpClient,
              private _sanitizer: DomSanitizer,
              private _toastr: ToastrService,
              @Inject(Window) private _window: Window) {
  }

  ngOnInit(): void {
    this._configService.config$.pipe(
      filter(c => !!c)
    ).subscribe(config => {
      this.chatbotConfig = config;
      this._initForms();
    });
  }

  get customizationControls() {
    return this.customizationForm.controls;
  }

  get descriptionControls() {
    return this.descriptionForm.controls;
  }

  uploadIcon($event) {
    const file = $event.target.files[0];
    if (!file) {
      return;
    }
    this._storeIcon(file);
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

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  saveCustomization() {
    this._configService.saveConfig(Utils.getDirtyValues(this.customizationForm)).subscribe(() => {
      this._toastr.success('La personnalisation du chatbot a bien été modifiée');
      this.customizationForm.markAsPristine();
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

  private _storeIcon(file: any) {
    this.iconPreview = null;
    this.customizationControls.icon.setValue(file);
    this.customizationControls.icon.markAsDirty();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.iconPreview = this._sanitizer.bypassSecurityTrustResourceUrl(<string> reader.result);
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
    this.descriptionForm = this._fb.group({
      problematic: [this.chatbotConfig.problematic, [Validators.required, Validators.maxLength(200)]],
      audience: [this.chatbotConfig.audience, [Validators.required, Validators.maxLength(200)]],
      solution: [this.chatbotConfig.solution, [Validators.required, Validators.maxLength(200)]],
    });

    if (!this.chatbotConfig.icon) {
      return;
    }
    this._http.get(`${this.mediaPath}${this.chatbotConfig.icon}`, {responseType: 'blob'}).subscribe((file: any) => {
      file.name = this.chatbotConfig.icon;
      this._storeIcon(file);
      this.customizationForm.markAsPristine();
    });
  }

}
