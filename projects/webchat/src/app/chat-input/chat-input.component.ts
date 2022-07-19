import { Component, ElementRef, Input, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { FormBuilder, FormControl } from '@angular/forms';
import { WebchatService } from '../core/services/webchat.service';
import { MessageType } from '../core/enums/message-type.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ChatInputComponent implements OnInit {
  @Input() public placeholder: string;
  @Input() public botColor: string;

  _blockTypeText: boolean;
  get blockTypeText(): boolean {
    return this._blockTypeText;
  }

  @Input() set blockTypeText(value: boolean) {
    this._blockTypeText = value;
    if (this.blockTypeText && this.messageText) {
      this.messageText.disable();
    } else if (this.messageText) {
      this.messageText.enable();
      this.focus.next(true);
    }
  }

  @Input() public showIntentSearch: boolean;
  @Input() public focus: Subject<boolean>;
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

  onSubmit($event?: any) {
    if ($event) {
      $event.preventDefault();
    }
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
