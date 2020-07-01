import { Component, Input, OnInit } from '@angular/core';
import { Config } from '@model/config.model';

@Component({
  selector: 'app-chatbot-embedded-preview',
  templateUrl: './chatbot-embedded-preview.component.html',
  styleUrls: ['./chatbot-embedded-preview.component.scss']
})
export class ChatbotEmbeddedPreviewComponent implements OnInit {

  @Input() chatbot: Config;
  @Input() iconSrc: string;
  @Input() embeddedIconSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
