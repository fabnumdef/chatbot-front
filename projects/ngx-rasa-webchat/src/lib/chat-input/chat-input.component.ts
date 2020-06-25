import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MessageType } from '../message-type.enum';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngx-rasa-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatInputComponent implements OnInit {
  @Input() public placeholder: string;
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message') message: ElementRef;
  messageText = '';

  ngOnInit() {
    this.focus.subscribe(() => this.focusMessage());
  }

  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public clearMessage() {
    this.messageText = '';
  }

  onSubmit() {
    if (this.messageText.trim() === '') {
      return;
    }
    this.send.emit({
      message: this.messageText,
      type: MessageType.text
    });
    this.clearMessage();
    this.focusMessage();
  }
}
