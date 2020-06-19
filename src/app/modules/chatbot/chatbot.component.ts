/* tslint:disable */
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PublicConfigService } from '@core/services/public-config.service';
import { filter, tap } from 'rxjs/operators';

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
    this._publicConfigService.config$.pipe(
      filter(c => !!c),
      tap(() => {
        const script = this._renderer2.createElement('script');
        script.text = `
            WebChat.default.init({
    embedded: true,
    selector: "#webchat",
    initPayload: "/phrase_presentation",
    socketUrl: "${this._window.location.origin}/socket-chatbot/",
    socketPath: "",
    params: {
      storage: "session",
    },
    mainColor: "${this._publicConfigService.config.primaryColor}",
    assistBackgoundColor: "${this._publicConfigService.config.primaryColor}",
    assistTextColor: "#FFFFFF",
    userBackgroundColor: "${this._publicConfigService.config.secondaryColor}",
    userTextColor: "#000000",
    title: "${this._publicConfigService.config.name}",
    subtitle: "${this._publicConfigService.config.function}",
    inputTextFieldHint: "Posez votre question ...",
    showFullScreenButton: false,
    profileAvatar: "${this._window.location.origin}/media/${this._publicConfigService.config.icon}"
  })
        `;

        this._renderer2.appendChild(this._document.body, script);
      })
    ).subscribe();
  }

}
