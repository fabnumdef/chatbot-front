import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MediaService } from '@core/services/media.service';
import { Media } from '@model/media.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list-dialog.component.html',
  styleUrls: ['./media-list-dialog.component.scss']
})
export class MediaListDialogComponent implements OnInit {

  medias$: Observable<Media[]>;
  mediaSelected: Media;

  constructor(public dialogRef: MatDialogRef<MediaListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _mediaService: MediaService) {
  }

  ngOnInit(): void {
    this._mediaService.load().subscribe();
    this.medias$ = this._mediaService.entities$;
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

}
