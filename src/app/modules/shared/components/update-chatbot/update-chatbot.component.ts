import { Component, OnInit } from '@angular/core';
import { RasaService } from '@core/services/rasa.service';
import { Observable } from 'rxjs';
import { ConfigService } from '@core/services/config.service';
import { Config } from '@model/config.model';

@Component({
  selector: 'app-update-chatbot',
  templateUrl: './update-chatbot.component.html',
  styleUrls: ['./update-chatbot.component.scss']
})
export class UpdateChatbotComponent implements OnInit {

  config$: Observable<Config>;

  constructor(private _rasaService: RasaService,
              private _configService: ConfigService) {
  }

  ngOnInit(): void {
    this.config$ = this._configService.config$;
  }

  trainRasa() {
    this._rasaService.train().subscribe();
    this._configService.config$.next({...this._configService.config$.getValue(), ...{trainingRasa: true}});
    this._configService.getContinuousConfig(true);
  }

}
