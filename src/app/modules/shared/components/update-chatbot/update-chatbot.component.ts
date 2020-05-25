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

  loading$: Observable<boolean>;
  config$: Observable<Config>;

  constructor(private _rasaService: RasaService,
              private _configService: ConfigService) {
  }

  ngOnInit(): void {
    this.loading$ = this._rasaService.loading$;
    this.config$ = this._configService.config$;
  }

  trainRasa() {
    this._rasaService.train().subscribe();
  }

}
