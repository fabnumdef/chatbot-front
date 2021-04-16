import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FaqService } from '../core/services/faq.service';
import { Intent } from '@model/intent.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { WebchatService } from '../core/services/webchat.service';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {
  @Input() public botColor: string;
  public intents: Intent[];
  @ViewChild('message') message: ElementRef;
  messageText: FormControl;
  recognition;

  // @ts-ignore
  public SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  constructor(public faqService: FaqService,
              private _fb: FormBuilder,
              private _chatbotService: WebchatService) {
  }

  ngOnInit(): void {
    this._loadCategories();
    this.messageText = this._fb.control('');

    if (this.SpeechRecognition) {
      this.recognition = new this.SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'fr-FR';
      this.recognition.onresult = this._resumeRecognition;
    }
  }

  public loadCategory(category: string) {
    this.faqService.loadCategory(category).subscribe(intents => {
      this.intents = intents;
    });
  }

  private _loadCategories() {
    this.faqService.loadCategories().subscribe();
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
    // Call search intent
    this._chatbotService.searchIntents(this.messageText.value.trim(), '1000', true).subscribe((intents: any[]) => {
      this.intents = intents;
    });
  }

}
