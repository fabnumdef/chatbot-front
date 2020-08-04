import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatFeedbackModalService } from './chat-feedback-modal.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-rasa-chat-feedback-modal',
  templateUrl: './chat-feedback-modal.component.html',
  styleUrls: ['./chat-feedback-modal.component.css']
})
export class ChatFeedbackModalComponent implements OnInit, OnDestroy {
  @Input() primaryColor: string;
  @Input() secondaryColor: string;

  public data: any;
  public feedbackFormControl = this._fb.control(null, Validators.required);

  private element: any;

  constructor(private _modalService: ChatFeedbackModalService,
              private _el: ElementRef,
              private _fb: FormBuilder) {
    this.element = _el.nativeElement;
  }

  ngOnInit(): void {

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'ngx-rasa-chat-feedback-modal') {
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
  open(data?: any): void {
    this.data = data;
    this.element.style.display = 'block';
    document.body.classList.add('ngx-rasa-chat-feedback-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('ngx-rasa-chat-feedback-modal-open');
  }

  sendFeedback(): void {
    const feedback = {
      userQuestion: this.data?.userQuestion,
      botResponse: this.data?.botResponse,
      timestamp: this.data?.timestamp,
      status: this.feedbackFormControl.value,
      senderId: this.data?.senderId
    };
    this._modalService.sendFeedback(feedback);
    this.close();
  }
}
