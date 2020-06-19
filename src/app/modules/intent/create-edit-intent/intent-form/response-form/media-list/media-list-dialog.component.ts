import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaService } from '@core/services/media.service';
import { Media } from '@model/media.model';
import { Utils } from '@core/utils/utils';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list-dialog.component.html',
  styleUrls: ['./media-list-dialog.component.scss']
})
export class MediaListDialogComponent implements OnInit {

  medias: Media[] = [];
  mediaSelected: Media;
  onlyImages = false;
  unescape = unescape;
  utils = Utils;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(Window) private _window: Window,
              private _mediaService: MediaService) {
    this.onlyImages = data.onlyImages ? data.onlyImages : false;
  }

  ngOnInit(): void {
    this._mediaService.loadAll().subscribe();
    this._mediaService.fullEntities$.subscribe(medias => {
      if (this.onlyImages) {
        return this.medias = medias.filter(m => Utils.isFileImage(m.file));
      }
      this.medias = medias;
    });
  }

  selectMedia(media: Media) {
    if (media.id === this.mediaSelected?.id) {
      this.mediaSelected = null;
    }
    this.mediaSelected = media;
  }

  isMediaSelected(media: Media): boolean {
    return media.id === this.mediaSelected?.id;
  }

  getMediaPath(media: Media) {
    return `${this.mediaPath}${encodeURI(media.file)}`;
  }

  get mediaPath() {
    return `${this._window.location.origin}/media/`;
  }

}
