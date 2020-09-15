import { Component, ElementRef, Input, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { WebchatService } from '../core/services/webchat.service';
import { MessageType } from '../core/enums/message-type.enum';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatInputComponent implements OnInit {
  @Input() public placeholder: string;
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @Output() public dismiss = new EventEmitter();
  @ViewChild('message') message: ElementRef;
  messageText: FormControl;
  intents: any[];

  constructor(private _fb: FormBuilder,
              private _chatbotService: WebchatService) {
  }

  ngOnInit() {
    this.messageText = this._fb.control('');
    this.focus.subscribe(() => this.focusMessage());

    this.messageText.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter(value => {
        if (value.length > 2) {
          return true;
        }
        this.intents = [];
        return false;
      })
    ).subscribe(value => {
      // Call search intent
      this._chatbotService.searchIntents(value).subscribe((intents: any[]) => {
        this.intents = intents;
      });
    });
  }

  public focusMessage() {
    this.message.nativeElement.focus();
  }

  public clearMessage() {
    this.intents = [];
    this.messageText.setValue('');
  }

  public sendIntent(intent) {
    this.send.emit({
      message: intent.mainQuestion,
      payload: `/${intent.id}`,
      type: MessageType.text
    });
    this.clearMessage();
    this.focusMessage();
  }

  onSubmit() {
    if (this.messageText.value.trim() === '') {
      return;
    }
    this.send.emit({
      message: this.messageText.value,
      type: MessageType.text
    });
    this.clearMessage();
    this.focusMessage();
  }
}
