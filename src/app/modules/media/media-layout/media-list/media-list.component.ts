import { Component, OnInit } from '@angular/core';
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

  constructor(private _mediaService: MediaService) { }

  ngOnInit(): void {
    this.loading$ = this._mediaService.loading$;
    this.medias$ = this._mediaService.entities$;
    this.loadMedias();
  }

  deleteMedia(id) {
    this._mediaService.delete(id).subscribe();
  }

  /**
   * PRIVATE FUNCTIONS
   */

  private loadMedias() {
    this._mediaService.load().subscribe();
  }

}
