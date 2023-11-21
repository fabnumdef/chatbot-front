import { Component, Input, OnInit } from '@angular/core';
import { Config } from '@model/config.model';

@Component({
  selector: 'app-chatbot-preview',
  templateUrl: './chatbot-preview.component.html',
  styleUrls: ['./chatbot-preview.component.scss']
})
export class ChatbotPreviewComponent implements OnInit {

  @Input() chatbot: Config;

  @Input() iconSrc: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
