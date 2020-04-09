import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../core/services/media.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-layout',
  templateUrl: './media-layout.component.html',
  styleUrls: ['./media-layout.component.scss']
})
export class MediaLayoutComponent implements OnInit {

  loading$: Observable<boolean>;

  constructor(private _mediaService: MediaService) {
  }

  ngOnInit(): void {
    this.loading$ = this._mediaService.loading$;
  }

  uploadMedia($event) {
    const file = $event.target.files[0];
    if (!file) {
      return;
    }
    this._mediaService.create(file).subscribe();
    $event.target.value = '';
  }

}
