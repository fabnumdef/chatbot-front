import { Component, OnInit } from '@angular/core';
import { RasaService } from '@core/services/rasa.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-chatbot',
  templateUrl: './update-chatbot.component.html',
  styleUrls: ['./update-chatbot.component.scss']
})
export class UpdateChatbotComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private _rasaService: RasaService) {
  }

  ngOnInit(): void {
    this.loading$ = this._rasaService.loading$;
  }

  trainRasa() {
    this._rasaService.train().subscribe();
  }

}
