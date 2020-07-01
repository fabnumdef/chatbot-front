import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot-access',
  templateUrl: './chatbot-access.component.html',
  styleUrls: ['./chatbot-access.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotAccessComponent implements OnInit {

  chatbotPath = '/chatbot';

  constructor() {
  }

  ngOnInit(): void {
  }

}
