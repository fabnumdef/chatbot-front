import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatHelpModalService } from './chat-help-modal.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-rasa-chat-help-modal',
  templateUrl: './chat-help-modal.component.html',
  styleUrls: ['./chat-help-modal.component.css']
})
export class ChatHelpModalComponent implements OnInit, OnDestroy {
  @Input() primaryColor: string;
  @Input() botHelp: string;

  private element: any;

  constructor(private _el: ElementRef,
              private _modalService: ChatHelpModalService) {
    this.element = _el.nativeElement;
  }

  ngOnInit(): void {

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'ngx-rasa-chat-help-modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this._modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this._modalService.remove();
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('ngx-rasa-chat-help-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('ngx-rasa-chat-help-modal-open');
  }

}
