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
    this.loadMedias();
  }

  deleteMedia(media: Media) {
    this._mediaService.delete(media).subscribe();
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private loadMedias() {
    this._mediaService.load().subscribe();
  }

}
