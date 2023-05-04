import { Component, Inject, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import { Title } from '@angular/platform-browser';
import { Config } from './core/models/config.model';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public chatbotUrl;

  constructor(@Inject(Window) public window: Window,
              public configService: ConfigService,
              private _titleService: Title) {
    this.chatbotUrl = environment.chatbotUrl;
    this.configService.init(this.chatbotUrl);
  }

  ngOnInit() {
    this.configService.config$.subscribe((config: Config) => {
      this._titleService.setTitle(`Chatbot - ${config?.name}`);
    });
  }
}
