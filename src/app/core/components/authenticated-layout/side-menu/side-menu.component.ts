import { Component, Inject, OnInit } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { Config } from '@model/config.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  chatbotConfig: Config;

  constructor(private _configService: ConfigService,
              @Inject(Window) public window: Window) {
  }

  ngOnInit(): void {
    this._configService.config$.pipe(
      filter(c => !!c)
    ).subscribe(config => {
      this.chatbotConfig = config;
    });
  }

  getMediaPath(file: string) {
    return `${this.mediaPath}${encodeURI(file)}`;
  }

  get mediaPath() {
    return `${this.window.location.origin}/media/`;
  }

}
