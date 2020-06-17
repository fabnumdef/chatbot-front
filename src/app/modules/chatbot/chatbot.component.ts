/* tslint:disable */
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from '@core/services/config.service';
import { PublicConfigService } from '@core/services/public-config.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor(private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(Window) private _window: Window,
              private _publicConfigService: PublicConfigService) {
  }

  ngOnInit(): void {
    const script = this._renderer2.createElement('script');
    script.text = `
            WebChat.default.init({
    embedded: true,
    selector: "#webchat",
    initPayload: "phrase_presentation",
    socketUrl: "${this._window.location.origin}:5005",
    socketPath: "/socket.io/",
    storage: "session",
    title: "${this._publicConfigService.config$.value?.name}",
    subtitle: "${this._publicConfigService.config$.value?.function}",
    inputTextFieldHint: "Posez votre question ...",
    showFullScreenButton: false,
    profileAvatar: "${this._window.location.origin}/media/${this._publicConfigService.config$.value?.icon}"
  })
        `;

    this._renderer2.appendChild(this._document.body, script);
  }

}
