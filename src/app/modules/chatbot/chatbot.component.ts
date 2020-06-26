import { Component, Inject, OnInit } from '@angular/core';
import { PublicConfigService } from '@core/services/public-config.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  public chatbotHeight = 0;

  constructor(@Inject(Window) public window: Window,
              public publicConfigService: PublicConfigService) {
  }

  ngOnInit() {
    this.chatbotHeight = this.window.innerHeight;
    this.window.onresize = () => {
      this.chatbotHeight = this.window.innerHeight;
    };
  }

}
