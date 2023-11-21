import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-chatbot-access',
  templateUrl: './chatbot-access.component.html',
  styleUrls: ['./chatbot-access.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotAccessComponent implements OnInit {

  chatbotPath = `${window.location.origin  }/chatbot/`;

  embeddedCode =
    `<script src="${window.location.origin}/backoffice/assets/scripts/embbed-chatbot.min.js"></script>
<div id="webchat"></div>
<script>
  Webchat.init({
    // Mandatory
    botURL: '${window.location.origin}/chatbot',
    // Optionnal
    chatWidth: '400px',
    chatHeight: '500px',
    buttonSize: '60px',
    buttonColor: '#6e91f0',
    iconSize: '30px',
    iconColor: '#ffffff'
  });
</script>`;

  constructor(private _clipboard: Clipboard,
              private _toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  copyToClipboard(value: string) {
    this._clipboard.copy(value);
    this._toastr.success('Copié dans le presse-papier');
  }

}
