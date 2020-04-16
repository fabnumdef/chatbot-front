import { Component, OnInit } from '@angular/core';
import { RasaService } from '@core/services/rasa.service';

@Component({
  selector: 'app-configuration-layout',
  templateUrl: './configuration-layout.component.html',
  styleUrls: ['./configuration-layout.component.scss']
})
export class ConfigurationLayoutComponent implements OnInit {

  constructor(private _rasaService: RasaService) {
  }

  ngOnInit(): void {
  }

  trainRasa() {
    this._rasaService.train().subscribe();
  }

}
