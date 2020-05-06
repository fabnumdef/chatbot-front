import { Component, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from '@model/config.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chatbot-config',
  templateUrl: './chatbot-config.component.html',
  styleUrls: ['./chatbot-config.component.scss']
})
export class ChatbotConfigComponent implements OnInit {

  configForm: FormGroup;
  chatbotConfig: Config;

  constructor(private _configService: ConfigService,
              private _fb: FormBuilder) {
  }

  ngOnInit(): void {
    this._configService.config$.pipe(
      filter(c => !!c)
    ).subscribe(config => {
      this.chatbotConfig = config;
      this._initForm();
    });
  }

  get controls() {
    return this.configForm.controls;
  }

  private _initForm() {
    this.configForm = this._fb.group({
      name: [this.chatbotConfig.name, [Validators.required, Validators.maxLength(50)]],
      function: [this.chatbotConfig.function, [Validators.required, Validators.maxLength(50)]],
      icon: [this.chatbotConfig.icon, [Validators.required, Validators.maxLength(50)]],
      primaryColor: [this.chatbotConfig.primaryColor, [Validators.required, Validators.maxLength(20)]],
      secondaryColor: [this.chatbotConfig.secondaryColor, [Validators.required, Validators.maxLength(20)]],
      problematic: [this.chatbotConfig.problematic, [Validators.required, Validators.maxLength(200)]],
      audience: [this.chatbotConfig.audience, [Validators.required, Validators.maxLength(200)]],
      solution: [this.chatbotConfig.solution, [Validators.required, Validators.maxLength(200)]],
    });
  }

}
