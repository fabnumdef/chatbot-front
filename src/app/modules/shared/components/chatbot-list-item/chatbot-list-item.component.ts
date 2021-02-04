import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chatbot-list-item',
  templateUrl: './chatbot-list-item.component.html',
  styleUrls: ['./chatbot-list-item.component.scss']
})
export class ChatbotListItemComponent implements OnInit {

  @Input() checkable = false;
  @Input() checked: boolean;
  @Input() checkboxOnBadges = false;
  @Output() checkedClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cardClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  isCheckboxOnSameLine(): boolean {
    return !!this.checkable && !this.checkboxOnBadges;
  }

}
