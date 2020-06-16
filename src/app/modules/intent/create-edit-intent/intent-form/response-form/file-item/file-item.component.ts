import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MediaListDialogComponent } from '../media-list/media-list-dialog.component';
import { filter, tap } from 'rxjs/operators';
import { Media } from '@model/media.model';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.scss']
})
export class FileItemComponent implements OnInit {

  @Input() disabled = false;
  @Input() media: Media = null;
  @Input() onlyImages = false;

  @Output() mediaChange = new EventEmitter<Media>();

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openMediaList() {
    const dialogRef = this._dialog.open(MediaListDialogComponent, {
      data: {
        onlyImages: this.onlyImages
      }
    });

    dialogRef.afterClosed().pipe(
      filter(v => !!v),
      tap(media => this.media = media),
      tap(() => {
        this.mediaChange.emit(this.media);
      })
    ).subscribe();
  }

  resetMedia() {
    this.media = null;
    this.mediaChange.emit(this.media);
  }

}
