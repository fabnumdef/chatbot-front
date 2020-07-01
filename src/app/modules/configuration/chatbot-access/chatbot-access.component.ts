import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-chatbot-access',
  templateUrl: './chatbot-access.component.html',
  styleUrls: ['./chatbot-access.component.scss', '../configuration-expansion-panel.scss']
})
export class ChatbotAccessComponent implements OnInit {

  chatbotPath = window.location.origin + '/chatbot';

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
