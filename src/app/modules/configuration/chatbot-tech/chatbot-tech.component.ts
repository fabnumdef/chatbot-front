import { Component, OnInit } from '@angular/core';
import { Config } from '@model/config.model';
import { ConfigService } from '@core/services/config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestroyObservable } from '@core/utils/destroy-observable';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Utils } from '@core/utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chatbot-tech',
  templateUrl: './chatbot-tech.component.html',
  styleUrls: ['./chatbot-tech.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotTechComponent extends DestroyObservable implements OnInit {

  techForm: FormGroup;
  chatbotConfig: Config;

  constructor(private _configService: ConfigService,
              private _fb: FormBuilder,
              private _toastr: ToastrService) {
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

  saveTechConfig() {
    this._configService.saveConfig(Utils.getDirtyValues(this.techForm)).subscribe(() => {
      this._toastr.success('La configuration technique du chatbot a bien été modifiée');
      this.techForm.markAsPristine();
    });
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private _initForms() {
    this.techForm = this._fb.group({
      storage: [this.chatbotConfig.storage, [Validators.required]],
    });
  }

}
