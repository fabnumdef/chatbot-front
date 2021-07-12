import { Component, Inject, OnInit } from '@angular/core';
import { ConfigService } from './core/services/config.service';
import { Title } from '@angular/platform-browser';
import { Config } from './core/models/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public chatbotHeight = 0;
  public chatbotUrl;

  constructor(@Inject(Window) public window: Window,
              public configService: ConfigService,
              private _titleService: Title) {
    this.chatbotUrl = window.location.origin;
    this.configService.init(this.chatbotUrl);
  }

  ngOnInit() {
    this.chatbotHeight = this.window.innerHeight;
    this.window.onresize = () => {
      this.chatbotHeight = this.window.innerHeight;
    };
    this.configService.config$.subscribe((config: Config) => {
      this._titleService.setTitle(`Chatbot - ${config?.name}`);
    });
  }
}
