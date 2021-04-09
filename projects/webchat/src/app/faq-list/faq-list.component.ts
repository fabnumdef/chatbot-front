import { Component, Input, OnInit } from '@angular/core';
import { FaqService } from '../core/services/faq.service';
import { Intent } from '@model/intent.model';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrls: ['./faq-list.component.scss']
})
export class FaqListComponent implements OnInit {
  @Input() public botColor: string;
  public intents: Intent[];

  constructor(public faqService: FaqService) {
  }

  ngOnInit(): void {
    this._loadCategories();
  }

  public loadCategory(category: string) {
    this.faqService.loadCategory(category).subscribe(intents => {
      console.log(intents);
      this.intents = intents;
    });
  }

  private _loadCategories() {
    this.faqService.loadCategories().subscribe();
  }

}
