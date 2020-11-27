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
  @Input() public blockTypeText: boolean;
  @Input() public showIntentSearch: boolean;
  @Input() public focus = new EventEmitter();
  @Output() public send = new EventEmitter();
  @ViewChild('message') message: ElementRef;
  messageText: FormControl;
  intents: any[];
  recognition;

  // @ts-ignore
  public SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  constructor(private _fb: FormBuilder,
              private _chatbotService: WebchatService) {
  }

  ngOnInit() {
    this.messageText = this._fb.control({value: '', disabled: this.blockTypeText});
    this.focus.subscribe(() => this.focusMessage());

    this.messageText.valueChanges.pipe(
      filter(() => this.showIntentSearch),
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

    if (this.SpeechRecognition) {
      this.recognition = new this.SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'fr-FR';
      this.recognition.onresult = this._resumeRecognition;
    }
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

  private _resumeRecognition = (event) => {
    let final_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      }
    }
    if (final_transcript) {
      this.messageText.setValue(final_transcript);
      this.messageText.updateValueAndValidity();
    }
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
