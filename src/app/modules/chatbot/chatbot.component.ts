import { Component, Inject } from '@angular/core';
import { PublicConfigService } from '@core/services/public-config.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

  constructor(@Inject(Window) public window: Window,
              public publicConfigService: PublicConfigService) {
  }

}
