import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from '../../../../core/models/media.model';
import { MediaService } from '../../../../core/services/media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.scss']
})
export class MediaListComponent implements OnInit {

  medias$: Observable<Media[]>;
  loading$: Observable<boolean>;
  processing$: Observable<boolean>;

  constructor(private _mediaService: MediaService,
              @Inject(Window) private _window: Window) {}

  ngOnInit(): void {
    this.loading$ = this._mediaService.loading$;
    this.processing$ = this._mediaService.processing$;
    this.medias$ = this._mediaService.entities$;
  }

  deleteMedia(media: Media) {
    this._mediaService.delete(media).subscribe();
  }

  uploadMedia($event) {
    const file: File = $event.target.files[0];
    if (!file) {
      return;
    }
    this._mediaService.createMedia(file).subscribe();
    $event.target.value = '';
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }
}
