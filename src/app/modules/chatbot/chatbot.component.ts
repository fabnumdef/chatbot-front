/* tslint:disable */
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor(private _renderer2: Renderer2,
              @Inject(DOCUMENT) private _document: Document,
              @Inject(Window) private _window: Window) {
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
    title: "FaC",
    subtitle: "Fabrique Numérique",
    inputTextFieldHint: "Posez votre question ...",
    showFullScreenButton: false,
    storage: "session",
    profileAvatar: "https://firebasestorage.googleapis.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-M0MbNyvjB7hr1guybEn%2F-M1fqT6lWaJK92SFPP4O%2F-M1fvDFAcMuCf7Cn-Y2Z%2Fdirty_logo-removebg-preview.png?alt=media&token=07396d0a-86a0-4eee-94cb-6fd4ee729a0f"
  })
        `;

    this._renderer2.appendChild(this._document.body, script);
  }

}
