import { Component, Inject, OnInit } from '@angular/core';
import { PublicConfigService } from '@core/services/public-config.service';
import { Title } from '@angular/platform-browser';
import { Config } from '@model/config.model';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  public chatbotHeight = 0;

  constructor(@Inject(Window) public window: Window,
              public publicConfigService: PublicConfigService,
              private _titleService: Title) {
  }

  ngOnInit() {
    this.chatbotHeight = this.window.innerHeight;
    this.window.onresize = () => {
      this.chatbotHeight = this.window.innerHeight;
    };
    this.publicConfigService.config$.subscribe((config: Config) => {
      this._titleService.setTitle(`Chatbot - ${config?.name}`);
    });
  }

}
